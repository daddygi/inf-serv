import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'tblUserInfo' })
export class UserInfo extends BaseEntity {
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
  birthDay: Date;

  @Column()
  age: number;

  @Column()
  civilStatus: string = '';

  @Column()
  residentType: string = '';

  @Column()
  contactNumber: number;

  @Column()
  occupation: string = '';

  @Column()
  residentIdNumber: number;

  @Column()
  address1: string = '';

  @Column()
  address2: string = '';

  @Column({ nullable: true })
  photo: string;

  @Column()
  @UpdateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}

@Entity({ name: 'tblAccounts' })
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string = '';

  @Column()
  password: string = '';

  // One-to-one relationship with tblUserInfo
  @OneToOne(() => UserInfo)
  @JoinColumn()
  userInfo: UserInfo;

  @BeforeInsert()
  async hashPassword() {
    console.log(this.password); // check if password field is defined
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

@Entity({ name: 'tblAnnouncements' })
export class Announcements extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  body: string = '';

  @Column()
  photo: string;

  @Column()
  @UpdateDateColumn()
  created_at: Date;
}

@Entity({ name: 'tblUserPhoto' })
export class UserPhoto extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  alt: string = '';

  @Column()
  photo: string;
}

@Entity({ name: 'tblTotals' })
export class Totals extends BaseEntity {
  @Column()
  totalInhabitants: number;

  @Column()
  totalMales: number;

  @Column()
  totalFemales: number;

  @Column()
  totalPermanentResidents: number;

  @Column()
  totalTempResidents: number;
}
