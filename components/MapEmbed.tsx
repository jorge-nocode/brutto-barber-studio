"use client";
import { useState } from "react";
import { ADDRESS, MAPS_EMBED_URL } from "../lib/data";

// O iframe do Google Maps só é criado depois do clique: antes disso nenhuma requisição ao Google é feita.
// Ocupa o .where__frame (altura definida no CSS da seção), então o layout não muda entre prévia e mapa.
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Mapa do Google Maps: ${ADDRESS.street}, ${ADDRESS.area}`}
        src={MAPS_EMBED_URL}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="mapgate">
      <div className="mapgate__grid" aria-hidden="true" />
      <div className="mapgate__card">
        <p className="mapgate__addr">{ADDRESS.street}<br />{ADDRESS.area}</p>
        <button type="button" className="mapgate__btn" onClick={() => setLoaded(true)}>
          <span>Carregar mapa</span>
        </button>
        <p className="mapgate__note">Ao carregar, o Google recebe dados técnicos da sua visita.</p>
      </div>
    </div>
  );
}
