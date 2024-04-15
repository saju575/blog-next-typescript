import { Response } from "express";
interface SuccessResponsePayload {
  message: string | "Success";
  payload?: any;
  statusCode: number | 200;
}

/* 
    error response controller
*/
export const errorResponse = (
  res: Response,
  {
    statusCode = 500,
    message = "Internal server error",
  }: { statusCode?: number; message?: string }
) => {
  return res
    .status(statusCode)
    .json({ success: false, status: statusCode, message });
};

/* 
        success response controller
    */
export const successResponse = (
  res: Response,
  successProps: SuccessResponsePayload
) => {
  if (successProps.payload === null) {
    return res.status(successProps.statusCode).json({
      success: true,
      status: successProps.statusCode,
      message: successProps.message,
    });
  }
  return res.status(successProps.statusCode).json({
    success: true,
    status: successProps.statusCode,
    message: successProps.message,
    payload: successProps.payload,
  });
};
