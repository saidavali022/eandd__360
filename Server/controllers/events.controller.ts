import Express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import { v4 as uuidV4 } from "uuid";

interface IEventRequest extends Request {
  params: { userId: string };
  query: {
    start: string;
    end: string;
  };
  body: {
    start?: string;
    end?: string;
    attendees?: string[];
    isAllDay?: boolean;
    title: string;
    description: string;
  };
}

export const getUserEvents = async (req: IEventRequest, res: Response) => {
  const { userId } = req.params;
  const { start, end } = req.query;

  try {
    const events = await prisma.events.findMany({
      where: {
        created_by: userId,
        start: {
          gte: new Date(start),
        },
        end: {
          lte: new Date(),
        },
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });

    const attendingEvents = await prisma.events.findMany({
      where: {
        event_attendees: {
          some: {
            attendee_id: userId,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });
    res.status(200).json([...events, ...attendingEvents]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const createEvent = async (req: IEventRequest, res: Response) => {
  const { userId } = req.params;
  const { start, end, attendees, title, description, isAllDay } = req.body;

  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }
  let attendeesInput = attendees == undefined ? [] : attendees;
  const eventId = uuidV4();
  let attendeesData = [...attendeesInput].map((attendee) => ({
    attendee_id: attendee,
  }));

  try {
    const event = await prisma.events.create({
      data: {
        kind: "kind#appointment",
        description,
        title,
        created_by: userId,
        start: new Date(start),
        end: new Date(end),
        event_attendees: {
          createMany: {
            data: attendeesData,
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

export const listEvents = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const events = await prisma.events.findMany({
      where: {
        event_attendees: {
          some: {
            attendee_id: userId,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  res.status(500).json({ message: "working" });
};

export const getUserEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.params;
  try {
    const event = await prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });
    // const events = await prisma.event_attendees.findMany({});
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  res.status(500).json({ message: "working" });
};
