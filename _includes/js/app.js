var searchTerm = 'Jeremy Lin';

$("#tweets").liveTwitter(searchTerm, {
  rate: 15000,
  rpp: 100
});