package models

import (
	"database/sql"
	"log"
)

type Job struct {
	ID               int     `json:"id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	ShortDescription string  `json:"shortDescription"`
	UserID           string  `json:"userId"`
	AskingPrice      int64   `json:"askingPrice"`
	Location         float32 `json:"location"`
	LocationName     string  `json:"locationName"`
	Username         string  `json:"username"`
	Email            string  `json:"email"`
	CreatedAt        string  `json:"createdAt"`
}

type ShippingLocation struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type JobObject struct {
	Title            string
	ShortDescription string
	Description      string
	AskingPrice      int
	UserID           int
}

type JobModel struct {
	DB *sql.DB
}

func (model *JobModel) FindOne(id int64) (Job, error) {
	var job Job
	query := `SELECT jobs.title,
       jobs.id,
       jobs.description,
       jobs.short_description as shortDescription,
       jobs.asking_price      as askingPrice,
       jobs.user_id           as userId,
       users.username,
       users.email FROM jobs INNER JOIN users WHERE jobs.id = ? AND users.id = jobs.user_id;`

	err := model.DB.QueryRow(query, id).Scan(&job.Title, &job.ID, &job.Description, &job.ShortDescription, &job.AskingPrice, &job.UserID, &job.Username, &job.Email)
	if err != nil {
		log.Println(err.Error())
		return Job{}, err
	}

	return job, nil
}

func (jm *JobModel) FindAll() []Job {
	query := `SELECT title, 
                     id,
                     description,
                     short_description AS shortDescription,
                     asking_price AS askingPrice,
                     user_id as userId,
                     created_at as createdAt,
                     location_name as locationName
              FROM jobs ORDER BY createdAt DESC`

	res, err := jm.DB.Query(query)
	defer res.Close()

	if err != nil {
		log.Printf("Failed to find all jobs. Error: %s", err)
	}

	jobs := []Job{}
	for res.Next() {
		var job Job
		err := res.Scan(&job.Title, &job.ID, &job.Description, &job.ShortDescription, &job.AskingPrice, &job.UserID, &job.CreatedAt, &job.LocationName)
		if err != nil {
			log.Printf("Failed to scan jobs. Error: %s", err)
		}
		jobs = append(jobs, job)
	}

	return jobs
}

func (jm *JobModel) Create(jobObject *JobObject) error {
	query := `INSERT INTO jobs (title, short_description, description, asking_price, user_id) VALUES (?, ?, ?, ?, ?)`
	_, err := jm.DB.Exec(query, jobObject.Title, jobObject.ShortDescription, jobObject.Description, jobObject.AskingPrice, jobObject.UserID)
	if err != nil {
		return err
	}

	return nil
}