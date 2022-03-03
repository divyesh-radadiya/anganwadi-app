import { Child } from "./child";

export const Children: Child[] = [
    {
      samId: "123",
      name: "Naman",
      age: 3,
      gender: "Male",
      address: "123, abc colony, mg road, pune. ",
      contactNumber: 9876543210,
      isDone: false,
      nextFollowupid:"2",
      nextDate: new Date("2022-03-01"),
      followUps: [
        {
          followUpId: "1",
          height: 80,
          weight: 12,
          muac: 3,
          growthStatus: "SAM",
          symptoms: "No",
          attempted: true,
          followupDate: new Date("2022-02-14"),
          attemptedDate: new Date("2022-02-14"),
        },
        {
          followUpId: "2",
          attempted: false,
          followupDate: new Date("2022-03-01"),
        },
        {
          followUpId: "3",
          attempted: false,
          followupDate: new Date("2022-03-16"),
        },
        {
          followUpId: "4",
          attempted: false,
          followupDate: new Date("2022-04-01"),
        },
        {
          followUpId: "5",
          attempted: false,
          followupDate: new Date("2022-04-16"),
        },
        {
          followUpId: "6",
          attempted: false,
          followupDate: new Date("2022-05-01"),
        },
      ],
    },
    {
      samId: "124",
      name: "Kishan",
      age: 2,
      gender: "Male",
      address: "456, xyz colony, cg road, pune.",
      contactNumber: 9876543456,
      isDone: false,
      nextDate: new Date("2022-03-03"),
      followUps: []
    },
    {
      samId: "125",
      name: "Raj",
      age: 4,
      gender: "Male",
      address: "478, aaa colony, kg road, pune.",
      contactNumber: 9876543756,
      isDone: false,
      nextDate: new Date("2022-03-04"),
      followUps: []
    },
    {
      samId: "121",
      name: "kunj",
      age: 1,
      gender: "Male",
      address: "102, kbn colony, cg road, pune.",
      contactNumber: 9786543756,
      isDone: true,
      followUps: []
    },
  ];