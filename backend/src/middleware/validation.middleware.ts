import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export default function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (err) {
      const zodError = err as ZodError
      return res.status(400).json({ errors: zodError.flatten() })
    }
  }
}
