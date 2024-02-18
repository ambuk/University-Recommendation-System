package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/gorilla/mux"
)

//Global es connection
var es *elasticsearch.Client

func returnESInfo(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Endpoint Hit: returnESInfo")
	res, err := es.Info()
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}

	fmt.Fprintln(w, res)
}

func returnESSearch(w http.ResponseWriter, r *http.Request) {

	//Handling CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		return
	}
	fmt.Println("Endpoint Hit: returnESSearch")

	reqBody, _ := ioutil.ReadAll(r.Body)

	var b strings.Builder
	b.Write(reqBody)
	query := strings.NewReader(b.String())

	// Perform the search request.
	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("degreesthatpayback"),
		es.Search.WithBody(query),
		es.Search.WithTrackTotalHits(true),
		es.Search.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()
	fmt.Fprintln(w, res)
}

func handleRequests() {

	// creates a new instance of a mux router
	myRouter := mux.NewRouter().StrictSlash(true)
	//Routes
	myRouter.HandleFunc("/esinfo", returnESInfo)
	myRouter.HandleFunc("/essearch", returnESSearch).Methods("POST", "OPTIONS")

	//Set CORS
	myRouter.Use(mux.CORSMethodMiddleware(myRouter))
	// finally, instead of passing in nil, we want
	// to pass in our newly created router as the second argument
	log.Fatal(http.ListenAndServe(":3000", myRouter))
}

func connectES() *elasticsearch.Client {
	cfg := elasticsearch.Config{
		Addresses: []string{
			"http://149.165.171.6:32112",
		},
	}
	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}
	fmt.Println("ES Connected!")
	return es
}

func main() {

	fmt.Println("Rest API v1.0 - College data analytics!")
	es = connectES()
	handleRequests()
}
