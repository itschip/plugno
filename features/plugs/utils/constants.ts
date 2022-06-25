import { PlugListingItem } from "../../../types/plugs";

export const MockPlugListings: PlugListingItem[] = [
  {
    id: 1,
    connected: false,
    location: 'Oslo',
    name: 'Roger',
    price: 102,
    busy: false,
    rating: 4.5
  },
  {
    id: 1,
    connected: true,
    location: 'Lørenskog',
    busy: false,
    name: 'Cookie man',
    price: 95,
    rating: 4.5
  },
  {
    id: 1,
    connected: false,
    location: 'Trondheim',
    name: 'Lisa',
    price: 140,
    busy: true,
    rating: 4.5
  },
  {
    id: 1,
    connected: true,
    location: 'Lørenskog',
    busy: false,
    name: 'Dora the Explorer',
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    connected: true,
    location: 'Bergen',
    busy: true,
    name: 'Chad',
    price: 240,
    rating: 4.5
  }
]