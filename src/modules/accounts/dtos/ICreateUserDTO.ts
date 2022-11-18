interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  drive_license: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
