package helper

import "log"

func ErrorPanic(err error) {
	if err != nil {
		log.Fatal(err)
	}
}