import React, { Component } from 'react';

export default class LegalMentions extends Component {
  
  render() {
    
    return (
        <div id="legal-mentions" className="container">
            <h5>Mentions légales</h5>

            <p>Merci de lire avec attentions les différentes modalités d’utilisation du présent site avant d’y parcourir ses pages. En vous connectant sur ce site, vous acceptez sans réserves les présentes modalités. Aussi, conformément de l’Article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l’économie numérique, les responsables du présent site internet sont :</p>

            <p className="title"><span>Editeur du Site :</span></p>
            <p>Vincent Monjaret et Myriam Haas</p>
            <p>Adresse mail de Vincent : vincent@gmail.com</p>
            <p>Adresse mail de Myriam : haasmyriam8@gmail.com</p>

            <p className="title"><span>Hébergement :</span></p>
            <p>Hébergeur : OVH</p>
            <p>140 Quai du Sartel, 59100 Roubaix</p>
            <p>Site Web : <a href="http://www.ovh.fr">www.ovh.fr</a></p>

            <p className="title"><span>Déclaration à la CNIL :</span></p>
            <p>Conformément à la loi 78-17 du 6 janvier 1978 (modifiée par la loi 2004-801 du 6 août 2004 relative à la protection des personnes physiques à l’égard des traitements de données à caractère personnel) relative à l’informatique, aux fichiers et aux libertés, ce site n’a pas fait l’objet d’une déclaration auprès de la Commission nationale de l’informatique et des libertés (<a href="http://www.cnil.fr/">www.cnil.fr</a>).</p>

            <p className="title"><span>Litiges : </span></p>
            <p>Les présentes conditions du site sont régies par les lois françaises et toute contestation ou litiges qui pourraient naître de l’interprétation ou de l’exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de la société. La langue de référence, pour le règlement de contentieux éventuels, est le français.</p>
        </div>
    );
  }
}