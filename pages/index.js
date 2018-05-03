import { Component } from 'react'
import fetch from 'isomorphic-unfetch'


class Index extends Component {

    static async getInitialProps () { 
        const res = await fetch('http://localhost:3000/api/buckets')
        const buckets = await res.json()
                
        return {
            buckets
        }
    }

    constructor(props) {
        super(props);
        this.state = { bucketName: '' }
      }

    createBucket() {
        const {bucketName} = this.state
        const data = { name: bucketName }

        console.info(`Creating new bucket named '${bucketName}'`)

        fetch('http://localhost:3000/api/buckets', {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json' },
            method: 'POST'
        })
        .then(response => {
            console.log('Bucket created')
            location.reload()
        })
    }

    deleteBucket(bucketName) {
        console.info(`Deleting bucket named '${bucketName}'`)

        fetch(`http://localhost:3000/api/buckets/${bucketName}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log('Bucket deleted')
            location.reload()
        })
    }

    bucketNameChanged(event) {
        this.setState({
            ...this.state,
            bucketName: event.target.value
        })
    }

    render() {
        const bucketItems = this.props.buckets.map(bucket => 
            <li key={bucket.Name}>
                <span>{bucket.Name}</span>
                <span>Created: {bucket.CreationDate}</span>
                <button type="button" onClick={this.deleteBucket.bind(this, bucket.Name)}>Delete</button>
            </li>
        )

        return (
            <div>
                <h1>S3 Box</h1>
                <p>S3 Box manages your S3 buckets.</p>
                <p>It leverages the AWS S3 API.</p>
                <p>It has absolutely no advantage over the AWS console.</p>
                <p>It demonstrates programatic use of the S3 API.</p>
                <div>
                    <input type="text" placeholder="Create new bucket" 
                        onBlur={this.bucketNameChanged.bind(this)}/>
                    <button onClick={this.createBucket.bind(this)}>Create</button>
                </div>
                <ul>
                    {bucketItems}
                </ul>
            </div>
        )
    }
}

export default Index