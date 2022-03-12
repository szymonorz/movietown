package api

type changePasswordBody struct {
	OldPassword string `json:"old_passowrd" validate:"required"`
	NewPassword string `json:"new_password" validate:"required"`
}
