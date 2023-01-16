import type Address from "./Address";

export default interface Individual {
    individualId: null;
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    dateOfBirth: Date;
    pronouns: string;
    homeAddress: Address;
    contactPhoneNumber: string;
    homePhoneNumber: string;
    mobilePhoneNumber: string;
    personalEmailAddress: string;
    universityEmailAddress: string;
  }