import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTrackAudio, processAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import { ArcHeaders } from "@typings/arc";

function getTracks(playlistId: string, market: string, headers: ArcHeaders) {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: { market },
  });

  return get({ url, headers });
}

const getPlaylist: ApiRequest = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  const trackRes = await getTracks(playlistId, market, headers);
  const tracksPage: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject> = trackRes.body;
  const trackIds = tracksPage.items.map((item) => item.track.id);
  const audioRes = await getTrackAudio(trackIds, headers);

  trackRes.body.items = tracksPage.items
    .map((item, index) => ({ ...item, audio: processAudio(audioRes.body.audio_features[index]) }))
    .filter((item) => item.track.is_playable);

  return trackRes.body;
};

export const handler = http.async(makeResponse(getPlaylist));
