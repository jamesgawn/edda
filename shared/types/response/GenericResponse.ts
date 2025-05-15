export type GenericResponse = {
  status: 200 | 400 | 404 | 500;
  message: string;
  data?: any;
  error?: string;
};
