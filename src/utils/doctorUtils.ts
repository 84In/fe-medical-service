// types
import {
  Doctor,
  Education,
  Experience,
  Achievement,
  WorkingHour,
} from "@/types";

// Generic function to update item in array
function updateArrayItem<T>(
  array: T[] | undefined,
  index: number,
  field: keyof T,
  value: T[keyof T]
): T[] {
  const copy = [...(array || [])];
  copy[index] = { ...copy[index], [field]: value };
  return copy;
}

// Education
export const addEducation = (doctor: DoctorData, setDoctor: SetDoctor) => {
  const newItem: Education = {
    id: Date.now(),
    degree: "",
    institution: "",
    year: "",
    description: "",
  };
  setDoctor({ ...doctor, education: [...(doctor.education || []), newItem] });
};

export const updateEducation = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number,
  field: keyof Education,
  value: string
) => {
  const updated = updateArrayItem(doctor.education, index, field, value);
  setDoctor({ ...doctor, education: updated });
};

export const removeEducation = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number
) => {
  const updated = [...(doctor.education || [])];
  updated.splice(index, 1);
  setDoctor({ ...doctor, education: updated });
};

// Work Experience
export const addWorkExperience = (doctor: DoctorData, setDoctor: SetDoctor) => {
  const newItem: Experience = {
    id: Date.now(),
    position: "",
    organization: "",
    startYear: "",
    endYear: "",
    description: "",
  };
  setDoctor({
    ...doctor,
    workExperience: [...(doctor.workExperience || []), newItem],
  });
};

export const updateWorkExperience = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number,
  field: keyof Experience,
  value: string
) => {
  const updated = updateArrayItem(doctor.workExperience, index, field, value);
  setDoctor({ ...doctor, workExperience: updated });
};

export const removeWorkExperience = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number
) => {
  const updated = [...(doctor.workExperience || [])];
  updated.splice(index, 1);
  setDoctor({ ...doctor, workExperience: updated });
};

// Achievements
export const addAchievement = (doctor: DoctorData, setDoctor: SetDoctor) => {
  const newItem: Achievement = {
    id: Date.now(),
    title: "",
    year: "",
    type: "AWARD",
    description: "",
  };
  setDoctor({
    ...doctor,
    achievements: [...(doctor.achievements || []), newItem],
  });
};

export const updateAchievement = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number,
  field: keyof Achievement,
  value: string | Achievement["type"]
) => {
  const updated = updateArrayItem(doctor.achievements, index, field, value);
  setDoctor({ ...doctor, achievements: updated });
};

export const removeAchievement = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number
) => {
  const updated = [...(doctor.achievements || [])];
  updated.splice(index, 1);
  setDoctor({ ...doctor, achievements: updated });
};

// Working Hours
export const updateWorkingHour = (
  doctor: DoctorData,
  setDoctor: SetDoctor,
  index: number,
  field: keyof WorkingHour,
  value: string | boolean
) => {
  const updated = updateArrayItem(doctor.workingHours, index, field, value);
  setDoctor({ ...doctor, workingHours: updated });
};
