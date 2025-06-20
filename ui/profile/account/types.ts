export type IProfileUserSettingsForm = {
  fullname: string
  username: string
  email: string
  password: string
}
export type IProfilePasswordForm = {
  email: string
  old_password: string
  new_password: string
  confirm_password: string
}
export type IProfilePhotoForm = {
  files: File[]
}
