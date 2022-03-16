import React, { useEffect, useState } from "react";
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

  const [searchChildren, setSearchChildern] = useState<Child[]>([]);

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

  const updateData = () => {
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
      });

      setSearchChildern((allSearchChildren) => {
        return allChildren;
      });
    });
  };

  const updateSearchData = () => {
    setSearchChildern((allSearchChildren) => {
      return allChildren;
    });
  };

  React.useEffect(() => {
    updateData();
  }, []);

  const isChildSelect = (samId: string) => {
    let currSelectedChildNext: Child =
      allChildren.find((child) => {
        // console.log(child.samId);
        return child.samId == samId;
      }) ?? selectedChild;

    let allfollowUps: Followup[] = [];

    currSelectedChildNext.followUps.forEach((curfollow: Followup) => {
      if (curfollow.attempted == false) {
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
        curfollow.attemptedDate = new Date(
          curfollow.attemptedDate ?? curfollow.followupDate
        );
        setFollowUp((currFollowUp) => curfollow);
      }
    });
  };

  const search = (name?: string) => {
    if (name == "" || name == null || name == undefined) {
      updateData();
    } else {
      setSearchChildern(() => {
        return [];
      });
      allChildren.forEach((child: Child) => {
        if (name?.toLowerCase() == child.name.toLowerCase()) {
          setSearchChildern((allSearchChildren) => {
            return allSearchChildren.concat(child);
          });
        }
      });
    }
  };

  return (
    <ChildernContext.Provider
      value={{
        allChildren,
        searchChildren,
        selectedChild,
        selectedFollowUp,
        isChildSelect,
        isFollowUpSelect,
        search,
        updateData,
        updateSearchData,
      }}
    >
      {props.children}
    </ChildernContext.Provider>
  );
};

export default ChildernContextProvider;
