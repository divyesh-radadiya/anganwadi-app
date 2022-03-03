import { Child } from "./child";

export const Children: Child[] = [
    {
      sam_id: "123",
      name: "Naman",
      age: 3,
      gender: "Male",
      address: "123, abc colony, mg road, pune. ",
      phone_no: 9876543210,
      is_done: false,
      next_followupid:"2",
      next_date: new Date("2022-03-01"),
      followups: [
        {
          id: "1",
          height: 80,
          weight: 12,
          muac: 3,
          growth_status: "SAM",
          other: "No",
          is_attemted: true,
          given_date: new Date("2022-02-14"),
          visited_date: new Date("2022-02-14"),
        },
        {
          id: "2",
          is_attemted: false,
          given_date: new Date("2022-03-01"),
        },
        {
          id: "3",
          is_attemted: false,
          given_date: new Date("2022-03-16"),
        },
        {
          id: "4",
          is_attemted: false,
          given_date: new Date("2022-04-01"),
        },
        {
          id: "5",
          is_attemted: false,
          given_date: new Date("2022-04-16"),
        },
        {
          id: "6",
          is_attemted: false,
          given_date: new Date("2022-05-01"),
        },
      ],
    },
    {
      sam_id: "124",
      name: "Kishan",
      age: 2,
      gender: "Male",
      address: "456, xyz colony, cg road, pune.",
      phone_no: 9876543456,
      is_done: false,
      next_date: new Date("2022-03-03"),
      followups: []
    },
    {
      sam_id: "125",
      name: "Raj",
      age: 4,
      gender: "Male",
      address: "478, aaa colony, kg road, pune.",
      phone_no: 9876543756,
      is_done: false,
      next_date: new Date("2022-03-04"),
      followups: []
    },
    {
      sam_id: "121",
      name: "kunj",
      age: 1,
      gender: "Male",
      address: "102, kbn colony, cg road, pune.",
      phone_no: 9786543756,
      is_done: true,
      followups: []
    },
  ];