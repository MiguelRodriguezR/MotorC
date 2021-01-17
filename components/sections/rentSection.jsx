import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useUserInfo from "../../hooks/useUserInfo";
import useSelections from "../../hooks/useSelections";
import SelectableHour from "../fragments/selectableHour";
import CONSTANTS from "../../helpers/constants";

const Container = styled.div`
  width: 95%;
  max-width: 1400px;
  background-color: #19193c;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .top {
    font-size: 2em;
    margin-bottom: 10px;
  }
  .text {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .top {
      font-size: 1.2em;
    }
    .text {
      font-size: 0.8em;
    }
  }
`;

const RentSection = () => {
  const { selections, saveGobalSelection } = useSelections();
  const { userInfo, saveSelection } = useUserInfo();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // console.log({selections});
    if (userInfo.selectedMotorcycles && selections.rented) {
      setSchedule(initSchedule());
    }
  }, [userInfo, selections]);

  // console.log({selections})

  const getHour = (i) =>
    i % 2 == 0 ? 8 + i / 2 + ":00" : Math.floor(8 + i / 2) + ":30";

  const initSchedule = () => {
    const sched = [];
    for (let i = 0; i <= 24; i++) {
      const section = {};
      section.hour = getHour(i);
      section.available =
        CONSTANTS.maxMotorbikes -
        selections.rented.filter((sr) => sr.hour == section.hour).length;
      section.selected = userInfo.selectedMotorcycles.find(
        (sm) => sm == section.hour
      );
      sched.push(section);
    }
    return sched;
  };

  const changeQuantity = (section, quantity) => {
    const sc = [];
    Object.assign(sc, schedule);
    sc.find((selected) => selected.hour == section.hour).available -= quantity;
    setSchedule(sc);
  };

  const unrentMotorbike = (section) => {
    changeQuantity(section, -1);
    const newUserSections = userInfo.selectedMotorcycles.filter(
      (s) => s !== section.hour
    );
    const newGlobalSections = selections.rented.filter(
      (s) => !(s.user === userInfo.userUid && s.hour === section.hour)
    );
    saveSelection(newUserSections);
    saveGobalSelection(newGlobalSections);
  };

  const rentMotorbike = (section) => {
    changeQuantity(section, 1);
    const newUserSections = [...userInfo.selectedMotorcycles, section.hour];
    const newGlobalSections = [
      ...selections.rented,
      { hour: section.hour, user: userInfo.userUid },
    ];
    saveSelection(newUserSections);
    saveGobalSelection(newGlobalSections);
  };

  const selectHour = (section) => {
    if (userInfo.selectedMotorcycles.find((h) => h == section.hour)) {
      unrentMotorbike(section, -1);
    } else if (section.available > 0) {
      rentMotorbike(section);
    }
  };

  if (!userInfo.selectedMotorcycles) {
    return "loading...";
  }

  return (
    <>
      <Container>
        <div className="top">Hello {userInfo.name} ! <span role="img" aria-label="sad">
            😃
          </span> </div>
        <div className="text">
          MotorC is a motorcycle rental application, we offer{" "}
          {CONSTANTS.maxMotorbikes} high-cylinder (1000cc) motorcycles, renting one of
          our motorcycles costs $5 every half hour <span role="img" aria-label="sad">🤑👀</span> , please schedule the hours you
          want to rent:
        </div>
        {schedule.map((section) => (
          <div
            className="s"
            key={section.hour}
            onClick={() => selectHour(section)}
          >
            <SelectableHour section={section}></SelectableHour>
          </div>
        ))}
      </Container>
    </>
  );
};

export default RentSection;
