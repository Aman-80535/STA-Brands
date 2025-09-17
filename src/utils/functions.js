import moment from "moment-timezone";

export const getFromToDateForBacth = (timestamp) => {
    const fromMoment = moment(timestamp.toDate()).tz("Asia/Kolkata");
    const toMoment = fromMoment.clone().add(24, "hours");
    return `${fromMoment.format("YYYY-MM-DD, h A")} - ${toMoment.format("h A")}`;
}