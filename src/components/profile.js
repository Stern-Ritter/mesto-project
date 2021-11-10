import { profileClasses } from "./constants.js";

const profile = document.querySelector(`.${profileClasses.profileClass}`);
const profileUserName = profile.querySelector(`.${profileClasses.profileUserNameClass}`);
const profileUserSubline = profile.querySelector(`.${profileClasses.profileUserSublineClass}`);
const profileUserAvatar = profile.querySelector(`.${profileClasses.profileUserAvatar}`);

export function drawProfile(profile) {
  profileUserName.textContent = profile.name;
  profileUserSubline.textContent = profile.about;
  profileUserAvatar.alt = profile.name;
  profileUserAvatar.src = profile.avatar;
}
