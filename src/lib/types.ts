export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
  email: string;
  parentName: string;
  bloodGroup: string;
  admissionDate: string;
}