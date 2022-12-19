import { Dayjs } from "dayjs";

export type SelectedDate = {
  date: Dayjs;
  times: Time[];
};

export type Time = {
  uuid: string;
  hours: string;
  minutes: string;
};

export type Poll = {
  id: number;
  shortkey: string;
  title: string;
  timezone: string;
  dates: DateType[];
};

export type DateType = {
  id: number;
  date: string;
  times: TimeType[];
};

export type TimeType = {
  id: number;
  hour: string;
  minute: string;
  votes: VoteType[];
};

export type VoteType = {
  id: number;
  name: string;
  vote: boolean;
};

export type Votes = { [key: number]: boolean | null };
