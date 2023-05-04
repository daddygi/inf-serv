import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'tblaccounts' })
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string = '';

  @Column()
  middleInitial: string = '';

  @Column()
  lastName: string = '';

  @Column()
  suffix: string = '';

  @Column()
  gender: string = '';

  @Column()
  age: string = '';

  @Column()
  contactNumber: string = '';

  @Column()
  occupation: string = '';

  @Column()
  residentIdNum: string = '';

  @Column()
  residentType: string = ' ';

  @Column()
  address1: string = '';

  @Column()
  address2: string = '';

  @Column({ unique: true })
  email: string = '';

  @Column()
  password: string = '';

  // @Column({ type: 'blob', nullable: true })
  // photo: Blob;

  @Column()
  @UpdateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log(this.password); // check if password field is defined
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
