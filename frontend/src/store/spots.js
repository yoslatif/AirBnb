import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';

export const getUserSpots = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'SPOTS_REQUEST' });
    const { authentication: { token } } = getState();
    const response = await csrfFetch('/api/spots/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'SPOTS_SUCCESS', payload: data.Spots });
    } else {
      dispatch({ type: 'SPOTS_FAILURE', payload: data.errors });
    }
  } catch (error) {
    dispatch({ type: 'SPOTS_FAILURE', payload: error.message });
  };
};
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const data = await response.json();
    const spots = data.Spots;
    dispatch({ type: GET_SPOTS, spots });
    return response;
};

export const postSpot = (body, url) => async () => {
    body.lat = 100;
    body.lng = 100;
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(body)
    });
    const spot = await response.json();

    await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: "POST",
        body: JSON.stringify({ url, preview: true })
    });

    return spot;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw response;
      }

      dispatch(removeSpot(spotId));
      return null;
  } catch (err) {
      console.error(err);
      return err;
  }
};

export const removeSpot = (spotId) => ({
  type: 'REMOVE_SPOT',
  spotId,
});

export const putSpot = (spotId, body) => async () => {
    body.lat = 100;
    body.lng = 100;
    const response = await csrfFetch('/api/spots/' + spotId, {
        method: "PUT",
        body: JSON.stringify(body)
    });
    return await response.json();
};

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS:
            return action.spots.reduce((spots, spot) => {
                spots[spot.id] = spot;
                return spots;
            }, {});
            case 'REMOVE_SPOT':
    const newState = { ...state };
    delete newState[action.spotId];
    return newState;
        default:
            return state;
    }
};
