package main
import (
	"log"
	"os"
	"text/template"
)


func main() {
	host := os.Getenv("ETCD_HOST")
	port := os.Getenv("ETCD_PORT")
	https := os.Getenv("ETCD_HTTPS")
	if host == "" { host = "etcd" }
	if port == "" { port = "2379" }

	f, err := os.Create("/etc/nginx/conf.d/default.conf")
	if err != nil { log.Fatal(err) }
	defer f.Close()
	t := template.Must(template.ParseFiles("ng-server.tmpl.conf"))
	t.Execute(f, map[string]string{"Host": host, "Port": port, "Https": https})
}