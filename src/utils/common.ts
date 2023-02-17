class Commons{
    public Response(res: any, statusCode: number,status:string, message: string, data: JSON | any) {
         res.status(statusCode).json({ status, message, data });
      }
}

export default new Commons();