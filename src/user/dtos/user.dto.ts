import { Expose } from 'class-transformer';
import { RoleModel } from 'src/models/role.model';

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  surname: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  roles: RoleModel[];
  @Expose()
  createdAt: Date;
}
