import { Observable } from "rxjs"

export class CreateUser {
  username: string
}

export class Auth {
  id: string
}

export class User {
  id: string

  username: string

  orders: any[]
}

export interface UserService {
  signUp(data: CreateUser): Observable<User>

  authenticate(data: Auth): Observable<User>
}
