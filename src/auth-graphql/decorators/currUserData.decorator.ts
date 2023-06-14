import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {JwtPayload} from '../types'
import {JwtService} from '@nestjs/jwt'

interface AuthHeaders extends Headers {
  authorization: string
}

export const CurrentUserData = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    // const req: Request = ctx.getContext().req
    const req = ctx.getContext().req
    const head = req.headers as AuthHeaders

    const jwtService = new JwtService()
    // const user
    console.log(head.authorization)
    const refreshToken = head.authorization
    const {userId} = jwtService.decode(refreshToken) as JwtPayload
    console.log('userId', userId)
    console.log('refreshToken', refreshToken)
    // console.log('req in decorator', req)
    // const user = req.user as JwtPayload
    console.log('req.user', req.user)
    // return user.userId //userId
    // return head.authorization
    return {userId, refreshToken}
  }
)
