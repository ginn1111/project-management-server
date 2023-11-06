import { NextFunction, Response } from "express";
import { IProjectRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

export const doneProject = async (req: IProjectRequest, res: Response, next: NextFunction) => {
  const {id} = req.params
  const {idProject} = req.body ?? {}
  try {
    if(!id && !idProject) return res.status(422).json("doneProject middleware invalid parameter")

    const project = await prismaClient.project.findFirst({
      where: {
        id: id || idProject
      }
    })

    if(project?.finishDate) return res.status(409).json("Dự án đã hoàn thành, không thể thao tác!")

    next();
    
  } catch (error) {
    console.log(error)
    return res.status(500).json("Server error")
    
  }

}