import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}

export default Photo;
