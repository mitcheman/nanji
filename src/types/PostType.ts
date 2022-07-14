export type PostType = {
  id: string,
  date: Date | string,
  s3Image?: string,
  image?: string
  location: string,
  content: string,
  createdAt: Date,
  updatedAt: Date   
}