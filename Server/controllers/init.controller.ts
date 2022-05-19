import { addMinutes, subMinutes, subDays, addDays, addHours } from "date-fns";
import Express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj: string;
  };
}

export const initTables = async (req: TypedRequest, res: Response) => {
  console.info("---");
  console.info("initTables");
  console.info("---");
  try {
    const user = await prisma.users.create({
      data: {
        employee_id: "END1111",
        email: "eandddeveloper2@gmail.com",
        first_name: "mohammed",
        last_name: "mushtaq",
        phone: "98745678",
        dob: new Date("1995-10-01"),
        gender: "male",
        country: "india",
        city: "hyderabad",
        zip_code: "500005",
        sudo_name: "robart smith",
        blood_group: "B-",
        marital_status: "single",
        department: "SD",
        designation: "full stack developer",
        doj: new Date("2022-01-02"),
        password: "1234",
        attendance: {
          create: {
            log_in: new Date(),
            breaks: {
              create: [
                {
                  break_start: new Date(),
                  break_end: addMinutes(new Date(), 20),
                },
              ],
            },
          },
        },
      },
    });
    const user2 = await prisma.users.create({
      data: {
        employee_id: "END1112",
        email: "eandddeveloper1@gmail.com",
        first_name: "shaik",
        last_name: "ali",
        phone: "8765436765",
        dob: new Date("1996-10-01"),
        gender: "male",
        country: "india",
        city: "Andhra",
        zip_code: "500044",
        sudo_name: "Albert Wilson",
        blood_group: "AB-",
        marital_status: "single",
        department: "SD",
        designation: "MERN Stack developer",
        doj: new Date("2022-01-02"),
        password: "1234",
        attendance: {
          create: {
            log_in: subDays(new Date(), 2),
            log_out: addHours(subDays(new Date(), 2), 9),
            breaks: {
              createMany: {
                data: [
                  {
                    break_start: addMinutes(subDays(new Date(), 2), 400),
                    break_end: addMinutes(subDays(new Date(), 2), 450),
                  },
                  {
                    break_start: addMinutes(subDays(new Date(), 2), 180),
                    break_end: addMinutes(subDays(new Date(), 2), 215),
                  },
                ],
              },
            },
          },
        },
      },
    });
    const user3 = await prisma.users.create({
      data: {
        employee_id: "END1113",
        email: "eandddeveloper3@gmail.com",
        first_name: "tarassal",
        last_name: "",
        phone: "8765436765",
        dob: new Date("1996-10-01"),
        sudo_name: "Jonny Max",
        department: "SD",
        designation: "MERN Stack developer",
        doj: new Date("2022-01-02"),
        password: "1234",
        attendance: {
          createMany: {
            data: [
              {
                log_in: subDays(new Date(), 2),
                log_out: addHours(subDays(new Date(), 2), 10),
              },
            ],
          },
        },
      },
    });
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return;
  }
};
