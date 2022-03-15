import React, { useState } from "react";
import { Child } from "../models/child";
import { Followup } from "../models/followup";
import sendRequest from "../services/getdata";
import ChildernContext from "./childern_contex";

const ChildernContextProvider: React.FC = (props) => {
  const [allChildren, setChildern] = useState<Child[]>([
    {
      samId: "123",
      name: "Naman",
      age: 3,
      gender: "Male",
      address: "123, abc colony, mg road, pune. ",
      contactNumber: 9876543210,
      isDone: false,
      nextFollowupid: "2",
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
  ]);

  const [selectedChild, setChild] = useState<Child>({
    samId: "123",
    name: "Naman",
    age: 3,
    gender: "Male",
    address: "123, abc colony, mg road, pune. ",
    contactNumber: 9876543210,
    isDone: false,
    nextFollowupid: "2",
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
  });

  const [selectedFollowUp, setFollowUp] = useState<Followup>({
    followUpId: "1",
    height: 80,
    weight: 12,
    muac: 3,
    growthStatus: "SAM",
    symptoms: "No",
    attempted: true,
    followupDate: new Date("2022-02-14"),
    attemptedDate: new Date("2022-02-14"),
  });

  React.useEffect(() => {
    sendRequest().then((data) => {
      setChildern(() => {
        return [];
      });

      data.forEach((curData: any) => {
        let newChild: Child = Object.assign(new Child(), curData["child"]);
        // let newChild: Child = Object.assign(new Child(), curData["followUps"]);
        let allfollowUps: Followup[] = [];
        let isDone = true;
        let nextDate = new Date();
        let nextFollowupid = "-";

        curData["followUps"].forEach((curfollow: any) => {
          let newFollow: Followup = Object.assign(new Followup(), curfollow);
          if (isDone == true && newFollow.attempted == false) {
            isDone = false;
            nextDate = newFollow.followupDate;
            nextFollowupid = newFollow.followUpId;
          }
          allfollowUps = allfollowUps.concat(newFollow);
        });
        newChild.followUps = allfollowUps;
        newChild.isDone = isDone;

        newChild.nextDate = new Date(nextDate);
        newChild.nextFollowupid = nextFollowupid;

        setChildern((allChildren) => {
          return allChildren.concat(newChild);
        });

        // console.log(newChild);
      });
      // setListChild()
      // setListItems(data);
      // console.log(childernCtx.allChildren[0]);
    });
  }, []);

  const isChildSelect = (samId: string) => {
    let currSelectedChildNext: Child =
      allChildren.find((child) => {
        // console.log(child.samId);
        return child.samId == samId;
      }) ?? selectedChild;

    // setChild((currChild) => {
    //   console.log(currSelectedChild == null);
    //   if (!!currSelectedChild) {
    //     console.log(currSelectedChild.samId);
    //   } else {
    //     console.log(currChild.samId);
    //   }
    //   return !!currSelectedChild ? currSelectedChild : currChild;
    //   return currSelectedChild ?? currChild;
    // });

    // console.log(selectedChild.samId);

    // const currSelectedChildNext = selectedChild;
    let allfollowUps: Followup[] = [];

    currSelectedChildNext.followUps.forEach((curfollow: Followup) => {
      if (curfollow.attempted == false) {
        // currSelectedChildNext.isDone = false;
        // currSelectedChildNext.nextDate = new Date(curfollow.followupDate);
        // currSelectedChildNext.nextFollowupid = curfollow.followUpId;
      } else {
        currSelectedChildNext.currGrowthStatus = curfollow?.growthStatus;
        currSelectedChildNext.currWeight = curfollow?.weight;
        curfollow.attemptedDate = new Date(
          curfollow.attemptedDate ?? curfollow.followupDate
        );
      }
      curfollow.followupDate = new Date(curfollow.followupDate);
      allfollowUps = allfollowUps.concat(curfollow);
    });

    currSelectedChildNext.followUps = allfollowUps;

    setChild((currChild) => currSelectedChildNext);
  };

  const isFollowUpSelect = (followUpId: string) => {
    selectedChild.followUps.forEach((curfollow: Followup) => {
      if (curfollow.followUpId == followUpId) {
        // let newFollow: Followup = Object.assign(new Followup(), curfollow);
        // console.log(curfollow);
        // curfollow.followupDate = new Date(curfollow.followupDate);
        curfollow.attemptedDate = new Date(
          curfollow.attemptedDate ?? curfollow.followupDate
        );
        // setFollow(() => {
        //   return newFollow;
        // });
        setFollowUp((currFollowUp) => curfollow);
      }
    });
  };

  return (
    <ChildernContext.Provider
      value={{
        allChildren,
        selectedChild,
        selectedFollowUp,
        isChildSelect,
        isFollowUpSelect,
      }}
    >
      {props.children}
    </ChildernContext.Provider>
  );
};

export default ChildernContextProvider;
