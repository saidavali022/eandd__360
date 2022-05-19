import Express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import { addDays, format } from "date-fns";

interface IEventRequest extends Request {
  params: { userId: string };
  query: {
    start: string;
    end: string;
  };
  body: {
    start?: string;
    end?: string;
    isAllDay?: boolean;
    title: string;
    description: string;
    status?: string;
    interview?: string;
    location?: string;
    phone?: string;
    response?: string;
    interview_status?: string;
    email?: string;
    name?: string;
  };
}

export const getHrInterviewEvents = async (
  req: IEventRequest,
  res: Response
) => {
  console.info("---");
  console.info("getHrInterviewEvents");
  console.info("---");
  const { userId } = req.params;
  const {
    start = format(new Date(), "yyyy-MM-dd"),
    end = addDays(new Date(), 31).toString(),
  } = req.query;

  //TODO: check user role if HR

  try {
    const interviewEvents = await prisma.events.findMany({
      where: {
        created_by: userId,
        kind: "kind#interview",
        start: {
          gte: new Date(start),
        },
        end: {
          lte: new Date(end),
        },
      },
      include: {
        event_attendees: {
          select: {
            email: true,
            name: true,
            location: true,
            phone: true,
            response: true,
          },
        },
      },
    });

    const events = interviewEvents.map((event) => ({
      id: event.event_id,
      event_id: event.event_id,
      created_by: event.created_by,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      status: event.status,
      interview_status: event.interview_status,
      kind: event.kind,
      name: event.event_attendees[0]?.name,
      email: event.event_attendees[0]?.email,
      phone: event.event_attendees[0]?.phone,
      location: event.event_attendees[0]?.location,
      response: event.event_attendees[0]?.response,
    }));

    res.status(200).json(events);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    return;
  }
};

export const createInterviewEvent = async (
  req: IEventRequest,
  res: Response
) => {
  console.info("---");
  console.info("createInterviewEvent");
  console.info("---");
  const { userId } = req.params;
  const {
    start,
    end,
    title,
    description,
    location,
    phone,
    interview_status,
    response,
    status,
    email,
    name,
  } = req.body;
  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }
  try {
    const interviewEvent = await prisma.events.create({
      data: {
        kind: "kind#interview",
        description,
        title,
        status,
        interview_status,
        created_by: userId,
        start: new Date(start),
        end: new Date(end),
        event_attendees: {
          create: {
            location,
            phone,
            name,
            response,
            email,
          },
        },
      },
      include: {
        event_attendees: true,
      },
    });
    res.status(201).json(interviewEvent);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error);
    return;
  }
};

export const updateInterviewEvent = async (req: Request, res: Response) => {
  console.info("---");
  console.info("updateInterviewEvent");
  console.info("---");
  const { eventId } = req.params;
  const { userId } = req.params;
  const {
    start,
    end,
    title,
    description,
    interview_status,
    status,
    response,
    location,
    name,
    phone,
    email,
  } = req.body;

  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }

  try {
    const event = await prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: {
        description,
        title,
        start: new Date(start),
        end: new Date(end),
        status,
        interview_status,
        event_attendees: {
          deleteMany: {
            event_id: eventId,
          },
          create: {
            email,
            location,
            name,
            phone,
            response,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            email: true,
            phone: true,
            response: true,
            location: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(event);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error);
    return;
  }
};
