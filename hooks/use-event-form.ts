"use client";

import { useState } from "react";
import { format } from "date-fns";
import { EventType, VerificationMethod, LocationData } from "@/types";

export interface EventFormState {
  step: number;
  eventType: EventType;
  basicInfo: {
    title: string;
    description: string;
    location: string;
    locationData?: LocationData; // Add locationData field
    organizationId: string | null; // Ensure this is string | null
  };
  schedule: {
    oneTime: {
      date: string;
      startTime: string;
      endTime: string;
      volunteers: number;
    };
    multiDay: Array<{
      date: string;
      slots: Array<{
        startTime: string;
        endTime: string;
        volunteers: number;
      }>;
    }>;
    sameDayMultiArea: {
      date: string;
      overallStart: string;
      overallEnd: string;
      roles: Array<{
        name: string;
        startTime: string;
        endTime: string;
        volunteers: number;
      }>;
    };
  };
  verificationMethod: VerificationMethod;
  requireLogin: boolean;
  isPrivate: boolean; // Added property for project visibility
}

export function useEventForm() {
  const formatInitialDate = () => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  };

  const [state, setState] = useState<EventFormState>({
    step: 1,
    eventType: "oneTime",
    verificationMethod: "qr-code", // Default to QR code method
    requireLogin: true, // Default to requiring login
    isPrivate: false, // Default to public
    basicInfo: {
      title: "",
      location: "",
      locationData: undefined, // Initialize locationData field
      description: "",
      organizationId: null, // Default to null (personal project)
    },
    schedule: {
      oneTime: {
        date: formatInitialDate(),
        startTime: "09:00",
        endTime: "17:00",
        volunteers: 1,
      },
      multiDay: [
        {
          date: formatInitialDate(),
          slots: [
            {
              startTime: "09:00",
              endTime: "17:00",
              volunteers: 1,
            },
          ],
        },
      ],
      sameDayMultiArea: {
        date: formatInitialDate(),
        overallStart: "09:00",
        overallEnd: "17:00",
        roles: [
          {
            name: "",
            volunteers: 1,
            startTime: "09:00",
            endTime: "17:00",
          },
        ],
      },
    },
  });

  const validateTimeRange = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return true;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    if (endHour < startHour) return false;
    if (endHour === startHour && endMinute <= startMinute) return false;
    return true;
  };

  const nextStep = () => {
    if (state.step < 5 && canProceed()) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const setEventType = (type: EventType) => {
    setState((prev) => ({ ...prev, eventType: type }));
  };

  const updateVerificationMethod = (method: VerificationMethod) => {
    setState((prev) => ({ ...prev, verificationMethod: method }));
  };

  const updateRequireLogin = (requireLogin: boolean) => {
    setState((prev) => ({ ...prev, requireLogin }));
  };

  const updateIsPrivate = (isPrivate: boolean) => {
    setState((prev) => ({ ...prev, isPrivate }));
  };

  const updateBasicInfo = (
    field: keyof EventFormState["basicInfo"],
    value: any,
  ) => {
    setState((prev) => {
      // Add character limit validation
      if (
        (field === "title" && value.length > 75) ||
        (field === "location" && value.length > 250) ||
        (field === "description" && value.length > 1000)
      ) {
        return prev;
      }

      return {
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          [field]: value,
        },
      };
    });
  };

  const addMultiDaySlot = (dayIndex: number) => {
    setState((prev) => {
      const newMultiDay = [...prev.schedule.multiDay];
      // Add only one new slot with default times
      newMultiDay[dayIndex] = {
        ...newMultiDay[dayIndex],
        slots: [
          ...newMultiDay[dayIndex].slots,
          {
            startTime: "09:00",
            endTime: "17:00",
            volunteers: 1,
          },
        ],
      };
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          multiDay: newMultiDay,
        },
      };
    });
  };

  const addMultiDayEvent = () => {
    setState((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        multiDay: [
          ...prev.schedule.multiDay,
          {
            date: "",
            slots: [
              {
                startTime: "",
                endTime: "",
                volunteers: 1,
              },
            ],
          },
        ],
      },
    }));
  };

  const addRole = () => {
    setState((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        sameDayMultiArea: {
          ...prev.schedule.sameDayMultiArea,
          roles: [
            ...prev.schedule.sameDayMultiArea.roles,
            {
              name: "",
              volunteers: 1,
              startTime: "",
              endTime: "",
            },
          ],
        },
      },
    }));
  };

  const updateOneTimeSchedule = (
    field: keyof EventFormState["schedule"]["oneTime"],
    value: string | number,
  ) => {
    setState((prev) => {
      const newSchedule = {
        ...prev.schedule.oneTime,
        [field]: value,
      };

      // Validate time range
      if (
        (field === "startTime" || field === "endTime") &&
        !validateTimeRange(newSchedule.startTime, newSchedule.endTime)
      ) {
        // If invalid, don't update
        return prev;
      }

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          oneTime: newSchedule,
        },
      };
    });
  };

  const updateMultiDaySchedule = (
    dayIndex: number,
    field: string,
    value: string,
    slotIndex?: number,
  ) => {
    setState((prev) => {
      const newMultiDay = [...prev.schedule.multiDay];

      if (slotIndex !== undefined) {
        const currentSlot = newMultiDay[dayIndex].slots[slotIndex];
        const newSlot = {
          ...currentSlot,
          [field]: value,
        };

        // Validate time range for slots
        if (
          (field === "startTime" || field === "endTime") &&
          !validateTimeRange(newSlot.startTime, newSlot.endTime)
        ) {
          return prev;
        }

        newMultiDay[dayIndex].slots[slotIndex] = newSlot;
      } else {
        newMultiDay[dayIndex] = {
          ...newMultiDay[dayIndex],
          [field]: value,
        };
      }

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          multiDay: newMultiDay,
        },
      };
    });
  };

  const updateMultiRoleSchedule = (
    field: string,
    value: string | number,
    roleIndex?: number,
  ) => {
    setState((prev) => {
      if (roleIndex !== undefined) {
        const newRoles = [...prev.schedule.sameDayMultiArea.roles];
        const currentRole = newRoles[roleIndex];

        // Add character limit validation for role names
        if (
          field === "name" &&
          typeof value === "string" &&
          value.length > 75
        ) {
          return prev;
        }

        const newRole = {
          ...currentRole,
          [field]: value,
        };

        // Validate time range for roles
        if (
          (field === "startTime" || field === "endTime") &&
          !validateTimeRange(newRole.startTime, newRole.endTime)
        ) {
          return prev;
        }

        newRoles[roleIndex] = newRole;
        return {
          ...prev,
          schedule: {
            ...prev.schedule,
            sameDayMultiArea: {
              ...prev.schedule.sameDayMultiArea,
              roles: newRoles,
            },
          },
        };
      }

      // Validate overall event time range
      if (
        (field === "overallStart" || field === "overallEnd") &&
        !validateTimeRange(
          field === "overallStart"
            ? (value as string)
            : prev.schedule.sameDayMultiArea.overallStart,
          field === "overallEnd"
            ? (value as string)
            : prev.schedule.sameDayMultiArea.overallEnd,
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          sameDayMultiArea: {
            ...prev.schedule.sameDayMultiArea,
            [field]: value,
          },
        },
      };
    });
  };

  const removeDay = (dayIndex: number) => {
    setState((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        multiDay: prev.schedule.multiDay.filter(
          (_, index) => index !== dayIndex,
        ),
      },
    }));
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    setState((prev) => {
      const newMultiDay = [...prev.schedule.multiDay];
      newMultiDay[dayIndex].slots = newMultiDay[dayIndex].slots.filter(
        (_, index) => index !== slotIndex,
      );
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          multiDay: newMultiDay,
        },
      };
    });
  };

  const removeRole = (roleIndex: number) => {
    setState((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        sameDayMultiArea: {
          ...prev.schedule.sameDayMultiArea,
          roles: prev.schedule.sameDayMultiArea.roles.filter(
            (_, index) => index !== roleIndex,
          ),
        },
      },
    }));
  };

  const canProceed = () => {
    switch (state.step) {
      case 1:
        return (
          state.basicInfo.title.trim() !== "" &&
          state.basicInfo.location.trim() !== "" &&
          state.basicInfo.description.trim() !== ""
        );
      case 2:
        return true; // Event type selection is always valid
      case 3:
        if (state.eventType === "oneTime") {
          return (
            state.schedule.oneTime.date &&
            state.schedule.oneTime.startTime &&
            state.schedule.oneTime.endTime &&
            state.schedule.oneTime.volunteers > 0
          );
        }
        if (state.eventType === "multiDay") {
          return state.schedule.multiDay.every(
            (day) =>
              day.date &&
              day.slots.every(
                (slot) => slot.startTime && slot.endTime && slot.volunteers > 0,
              ),
          );
        }
        if (state.eventType === "sameDayMultiArea") {
          return (
            state.schedule.sameDayMultiArea.date &&
            state.schedule.sameDayMultiArea.overallStart &&
            state.schedule.sameDayMultiArea.overallEnd &&
            state.schedule.sameDayMultiArea.roles.every(
              (role) =>
                role.name &&
                role.startTime &&
                role.endTime &&
                role.volunteers > 0,
            )
          );
        }
        return false;
      case 4:
        // Require a verification method to be selected
        return !!state.verificationMethod;
      default:
        return true;
    }
  };

  return {
    state,
    nextStep,
    prevStep,
    setEventType,
    updateVerificationMethod,
    updateRequireLogin,
    updateIsPrivate, // Added function to update project visibility
    updateBasicInfo,
    addMultiDaySlot,
    addMultiDayEvent,
    addRole,
    updateOneTimeSchedule,
    updateMultiDaySchedule,
    updateMultiRoleSchedule,
    removeDay,
    removeSlot,
    removeRole,
    canProceed,
  };
}
