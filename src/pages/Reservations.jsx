export const Reservations = () => {
  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="has-text-centered mb-6">
          <h1 className="title is-1">Réserver une Table</h1>
          <p className="subtitle is-4">
            Garantissez votre place pour une expérience gastronomique inoubliable
          </p>
        </div>

        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="card">
              <div className="card-header">
                <h2 className="card-header-title">Formulaire de Réservation</h2>
              </div>
              <div className="card-content">
                <form>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Date souhaitée</label>
                        <div className="control has-icons-left">
                          <input 
                            className="input" 
                            type="date" 
                            min={new Date().toISOString().split('T')[0]}
                          />
                          <span className="icon is-left">
                            <i className="fas fa-calendar"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Heure</label>
                        <div className="control has-icons-left">
                          <div className="select is-fullwidth">
                            <select>
                              <option>19h00</option>
                              <option>19h30</option>
                              <option>20h00</option>
                              <option>20h30</option>
                              <option>21h00</option>
                              <option>21h30</option>
                            </select>
                          </div>
                          <span className="icon is-left">
                            <i className="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Nombre de personnes</label>
                        <div className="control has-icons-left">
                          <div className="select is-fullwidth">
                            <select>
                              <option>1 personne</option>
                              <option>2 personnes</option>
                              <option>3 personnes</option>
                              <option>4 personnes</option>
                              <option>5 personnes</option>
                              <option>6 personnes</option>
                              <option>Plus de 6 personnes</option>
                            </select>
                          </div>
                          <span className="icon is-left">
                            <i className="fas fa-users"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Téléphone</label>
                        <div className="control has-icons-left">
                          <input className="input" type="tel" placeholder="06 12 34 56 78" />
                          <span className="icon is-left">
                            <i className="fas fa-phone"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Demandes spéciales</label>
                    <div className="control">
                      <textarea 
                        className="textarea" 
                        placeholder="Allergies, régime alimentaire, occasion spéciale..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="notification is-warning">
                    <p><strong>🔧 Système de réservation en développement</strong></p>
                    <p>Connexion avec l'API backend et gestion des créneaux à venir !</p>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button className="button is-primary is-fullwidth is-medium">
                        <span className="icon">
                          <i className="fas fa-calendar-check"></i>
                        </span>
                        <span>Confirmer la réservation</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="has-text-centered mt-5">
              <p className="content">
                <strong>Préférez-vous réserver par téléphone ?</strong><br />
                Appelez-nous au <a href="tel:+33123456789">01 23 45 67 89</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reservations;