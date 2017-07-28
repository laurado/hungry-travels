import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import RestaurantTile from '../components/RestaurantTile';
import SuggestedTile from '../components/SuggestedTile';

class TripShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      restaurants: [],
      suggested: []
    }
    this.getRestaurants = this.getRestaurants.bind(this);
    this.getSuggested = this.getSuggested.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRestaurantDelete = this.handleRestaurantDelete.bind(this);
    this.handleTripDelete = this.handleTripDelete.bind(this);
  }

  componentDidMount() {
    this.getRestaurants()
    this.getSuggested()
  }

  getRestaurants() {
    let tripId = this.props.params.id
    fetch(`/api/v1/trips/${tripId}`)
    .then(response => response.json())
    .then(body => {
      this.setState({
        trip: body.trip,
        restaurants: body.restaurants
      })
    })
  }

  getSuggested() {
    let payload = {
      tripId: this.props.params.id
    }
    fetch(`/yelp`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
      this.setState({ suggested: responseData.businesses })
    })
  }

  handleSearch(payload) {
  //   let payload = {
  //     location: {
  //       city: "Boston",
  //       state: "MA"
  //     }
  //   }
  //
  //   fetch(`/yelp?state=${}&city=${}`,
  //     {
  //       method: 'GET',
  //       credentials: 'same-origin',
  //       headers: { 'Content-Type': 'application/json' }
  //     }
  //   )
  //   .then(response => response.json())
  //   .then(responseData => {
  //     console.log(responseData)
  //     this.setState({ yelpData: responseData })
  //   })
  }

  handleRestaurantDelete() {
    console.log('in handle delete')
  }

  handleTripDelete() {
    let tripId = this.props.params.id
    fetch(`/api/v1/trips/${tripId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(body => {
      this.props.router.push('/') //redirect to index
    })
  }

  render() {
    let restaurants = this.state.restaurants.map(restaurant => {
      return (
        <RestaurantTile
          key={restaurant.name}
          restaurant={restaurant}
          handleDelete={this.handleRestaurantDelete}
        />
      )
    })

    let suggested = this.state.suggested.map(restaurant => {
      return (
        <SuggestedTile
          key={restaurant.id}
          restaurant={restaurant}
        />
      )
    })

    return (
      <div>
        <h1>{this.state.trip.name}</h1>
        <p>{this.state.trip.city}, {this.state.trip.state}</p>

        {restaurants}

        {suggested}

        <div className="callout">
          <p>Search by name/type of food</p>
          <form>
            <label>Name/Food Type
              <input
                name='search'
                type='text'
                value=''
              />
            </label>

            <div className="button-group">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>

        <Link to="/trips">Home</Link><br/>
        <Link onClick={this.handleTripDelete}>Delete Trip</Link>
      </div>
    )
  }
}

export default TripShowContainer;
