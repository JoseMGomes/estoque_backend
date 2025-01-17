export enum ErrorMessageUser {
  NOT_FOUND = "Usuario não encontrado.",
  ALREADY_EXISTS = "Usuario já existe.",
}

export enum ErrorMessageProduct {
  NOT_FOUND = "Produto não encontrado.",
  ALREADY_EXISTS = "Produto já existe.",
  INSUFFICIENT_STOCK = "Estoque insuficiente para retirar a quantidade solicitada.",
}

export enum ErrorMessage {
  BAD_REQUEST = "Requisição inválida.",
  INTERNAL_EXCEPTION = "Erro interno do servidor.",
  UNAUTHORIZED = "Acesso não autorizado.",
  INVALID_CREDENTIALS = "Credenciais inválidas.",
  FORBIDDEN = "Acesso proibido.",
  MISSING_FIELDS = "Campos obrigatórios estão faltando.",
  INVALID_TOKEN = "Token Invalido"
}
