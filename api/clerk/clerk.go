package clerk

import (
	"plugno-api/internal"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

var ClerkClient clerk.Client

func NewClerkClient() {
	var err error
	apiKey := internal.EnvVariable("CLERK_API_KEY")

	ClerkClient, err = clerk.NewClient(apiKey)
	if err != nil {
		panic(err)
	}
}
