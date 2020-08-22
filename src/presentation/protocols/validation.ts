
// validate recebe input do tipo any e retorna um Error
export interface Validation {
  validate: (input: any) => Error
}
