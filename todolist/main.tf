provider "docker" 
{   host = "tcp://localhost:2375" 
    
}

resource "docker_container" "ca-sample" {
  name  = "${random_string.random_name.result}"
  image = "${docker_image.dummy_image.latest}"
  entrypoint = ["/bin/sleep"]
  command = [ "1d" ]
}

resource "docker_image" "dummy_image" {
  name = "busybox:latest"
}

resource "random_string" "random_name" {
	length  = 5
	special = false
	lower   = false
} 
