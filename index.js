document.addEventListener('DOMContentLoaded', function () {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // City data for each country
    const cityData = {
        'AFG': ['Kabul', 'Kandahar', 'Herat', 'Mazar-e Sharif', 'Jalalabad', 'Kunduz', 'Ghazni', 'Balkh', 'Baghlan', 'Taloqan', 'Sheberghan', 'Charikar', 'Sar-e Pol', 'Farah', 'Lashkar Gah', 'Khost', 'Bamiyan', 'Maymana', 'Zaranj', 'Fayzabad'],
        'ALB': ['Tirana', 'Durrës', 'Vlorë', 'Shkodër', 'Fier', 'Elbasan', 'Korçë', 'Berat', 'Lushnjë', 'Kavajë', 'Pogradec', 'Laç', 'Kukës', 'Lezhë', 'Gjirokastër', 'Patos', 'Tepelenë', 'Cërrik', 'Gramsh', 'Burrel'],
        'DZA': ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif', 'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'Tlemcen', 'Ouargla', 'Béjaïa', 'Mostaganem', 'Chlef', 'El Oued', 'Skikda', 'Relizane', 'Aïn Beïda'],
        'ASM': ['Tafuna', 'Pago Pago', 'Nu’uuli', 'Leone', 'Fagatogo', 'Aua', 'Vaitogi', 'Malaeimi', 'Ili’ili', 'Faleniu', 'Mapusagafou', 'Pava’ia’i', 'Alofau', 'Amouli', 'Lauli’i', 'Utulei', 'Amanave', 'Taputimu', 'Fagasa', 'Futiga'],
        'AND': ['Andorra la Vella', 'Escaldes-Engordany', 'Encamp', 'Sant Julià de Lòria', 'La Massana', 'Ordino', 'Canillo'],
        'AGO': ['Luanda', 'N’dalatando', 'Huambo', 'Lobito', 'Benguela', 'Kuito', 'Lubango', 'Malanje', 'Namibe', 'Soyo', 'Cabinda', 'Uíge', 'Luena', 'Caxito', 'Sumbe', 'Menongue', 'Cuito Cuanavale', 'Ondjiva', 'Mbanza Congo', 'Caála'],
        'AIA': ['The Valley', 'Blowing Point', 'Sandy Ground', 'Island Harbour', 'West End Village', 'East End Village', 'North Hill', 'Stoney Ground', 'George Hill', 'South Hill'],
        'ATA': ['McMurdo Station', 'Amundsen-Scott South Pole Station', 'Palmer Station', 'Rothera Research Station', 'Esperanza Base', 'Vostok Station', 'Mawson Station', 'Casey Station', 'Davis Station', 'Bellingshausen Station'],
        'ATG': ['St. Johns', 'All Saints', 'Liberta', 'Grace Hill', 'Potters Village', 'Parham', 'Bolands', 'Willikies', 'Falmouth', 'Liberta'],
        'ARG': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'La Plata', 'Mar del Plata', 'Salta', 'San Juan', 'Santa Fe', 'Posadas', 'San Miguel de Tucumán', 'Resistencia', 'Neuquén', 'San Salvador de Jujuy', 'Santiago del Estero', 'Río Cuarto', 'San Rafael', 'Villa María', 'Catamarca'],
        'ARM': ['Yerevan', 'Gyumri', 'Vanadzor', 'Vagharshapat', 'Vayk', 'Kapan', 'Kapan', 'Ararat', 'Echmiadzin', 'Sevan', 'Stepanavan', 'Abovyan', 'Artashat', 'Hrazdan', 'Jermuk', 'Sisian', 'Charentsavan', 'Gavar', 'Shirak', 'Ijevan'],
        'ABW': ['Oranjestad', 'San Nicolas', 'Noord', 'Santa Cruz', 'Paradera', 'Savaneta', 'Dakota', 'Lagoon', 'Malmok', 'Pos Chikito'],
        'AUS': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Logan City', 'Central Coast', 'Hobart', 'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat', 'Bendigo', 'Mackay'],
        'AUT': ['Wien', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'St. Pölten', 'Dornbirn', 'Wels', 'Feldkirch', 'Bregenz', 'Leoben', 'Bad Ischl', 'Steyr', 'Krems an der Donau', 'Tulln an der Donau', 'Amstetten', 'Schwechat', 'Bludenz'],
        'AZE': ['Baku', 'Ganja', 'Mingachevir', 'Lankaran', 'Sumqayit', 'Mingachevir', 'Shaki', 'Yevlakh', 'Salyan', 'Shamakhi', 'Barda', 'Goychay', 'Guba', 'Nakhchivan', 'Lerik', 'Masally', 'Tartar', 'Quba', 'Zaqatala', 'Bilasuvar'],
        'BHS': ['Nassau', 'Freeport', 'West End', 'Marsh Harbour', 'Rock Sound', 'George Town', 'Governor\'s Harbour', 'Clifton', 'Andros Town', 'Kemps Bay'],
        'BHR': ['Manama', 'Muharraq', 'Riffa', 'Isa Town', 'Sitra', 'Al Hidd', 'A ali', 'Zallaq', 'Madinat Hamad', 'Jidhafs'],
        'BGD': ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Mymensingh', 'Rangpur', 'Comilla', 'Narayanganj', 'Bogura', 'Narsingdi', 'Jashore', 'Tangail', 'Feni', 'Satkhira', 'Pabna', 'Madaripur', 'Meherpur', 'Brahmanbaria'],
        'BRB': ['Bridgetown', 'Speightstown', 'Oistins', 'Holetown', 'Saint Lawrence Gap', 'The Crane', 'Bathsheba', 'Wildey', 'Eden Lodge', 'Worthing'],
        'BLR': ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk', 'Hrodna', 'Brest', 'Bobruisk', 'Baranovichi', 'Barysaw', 'Pinsk', 'Orsha', 'Slutsk', 'Zhlobin', 'Lida', 'Polotsk', 'Vaukavysk', 'Rechitsa', 'Novopolotsk', 'Svetlogorsk', 'Soligorsk'],
        'BEL': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst', 'Mechelen', 'La Louvière', 'Kortrijk', 'Hasselt', 'Oostende', 'Sint-Niklaas', 'Tournai', 'Seraing', 'Genk', 'Châtelet'],
        'BLZ': ['Belmopan', 'Belize City', 'San Ignacio', 'Corozal Town', 'Orange Walk Town', 'Dangriga', 'Punta Gorda', 'Benque Viejo del Carmen', 'Placencia', 'San Pedro'],
        'BEN': ['Porto-Novo', 'Cotonou', 'Parakou', 'Djougou', 'Bohicon', 'Abomey', 'Natitingou', 'Ouidah', 'Allada', 'Kandi', 'Sèmè-Podji', 'Zagnanado', 'Tchaourou', 'Savè', 'Lokossa', 'Bohicon', 'Bante', 'Aplahoué', 'Péhunco', 'Kérou'],
        'BMU': ['Hamilton', 'St. Georges', 'Dockyard', 'Somerset Village', 'Tuckers Town', 'Flatts Village', 'Spanish Point', 'Paget', 'Warwick', 'Saint Davids'],
        'BTN': ['Thimphu', 'Phuntsholing', 'Paro', 'Jakar', 'Wangdue Phodrang', 'Punakha', 'Haa', 'Mongar', 'Lhuntse', 'Trashigang'],
        'BOL': ['La Paz', 'Santa Cruz de la Sierra', 'Cochabamba', 'Sucre', 'El Alto', 'Oruro', 'Potosí', 'Tarija', 'Trinidad', 'Cobija', 'Riberalta', 'Yacuiba', 'Villazón', 'Quillacollo', 'Montero', 'Villamontes', 'Camiri', 'San Ignacio de Velasco', 'Roboré', 'Pailón'],
        'BES': ['Kralendijk', 'Oranjestad', 'The Bottom', 'Windwardside', 'Sabadeco', 'Lac Bay', 'Booby Hill', 'Cove Bay', 'Fort Bay', 'Hells Gate'],
        'BIH': ['Sarajevo', 'Banja Luka', 'Tuzla', 'Zenica', 'Mostar', 'Zenica', 'Tuzla', 'Sarajevo', 'Zenica', 'Tuzla', 'Travnik', 'Doboj', 'Bijeljina', 'Prijedor', 'Lukavac', 'Zavidovići', 'Maglaj', 'Goražde', 'Visoko', 'Livno'],
        'BWA': ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Selibe-Phikwe', 'Lobatse', 'Palapye', 'Kasane', 'Jwaneng', 'Orapa', 'Serowe', 'Letlhakane', 'Bobonong', 'Sowa Town', 'Tlokweng', 'Gantsi', 'Kanye', 'Hukuntsi', 'Ncojane', 'Tsabong'],
        'BRA': ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís', 'Maceió', 'Duque de Caxias', 'Nova Iguaçu', 'Teresina', 'Natal'],
        'IOT': ['Diego Garcia'],
        'BRN': ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar', 'Limbang', 'Muara', 'Temburong'],
        'BGR': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Dobrich', 'Shumen', 'Sliven', 'Montana', 'Pernik', 'Kyustendil', 'Blagoevgrad', 'Veliko Tarnovo', 'Gabrovo', 'Vratsa', 'Lovech', 'Haskovo', 'Yambol'],
        'BFA': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya', 'Kaya', 'Tenkodogo', 'Fada N\'Gourma', 'Dori', 'Ziniaré', 'Pouytenga', 'Kongoussi', 'Pama', 'Titao', 'Dédougou', 'Gaoua', 'Boromo', 'Réo', 'Boussouma', 'Orodara'],
        'BDI': ['Bujumbura', 'Gitega', 'Ngozi', 'Mubanira', 'Ruyigi', 'Muyinga', 'Cibitoke', 'Kayanza', 'Rumonge', 'Bururi', 'Makamba', 'Karusi', 'Muramvya', 'Rutana', 'Mwaro', 'Karuzi', 'Kibago', 'Mishambo', 'Bujumbura Rural', 'Nyanza-lac'],
        'CPV': ['Praia', 'Mindelo', 'Santa Maria', 'Assomada', 'São Filipe', 'São Vicente', 'Sal Rei', 'Tarrafal', 'Ribeira Brava', 'Paul'],
        'KHM': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Kampong Cham', 'Kampot', 'Poipet', 'Pursat', 'Takeo', 'Kampong Speu', 'Koh Kong', 'Svay Rieng', 'Tboung Khmum', 'Prey Veng', 'Mondulkiri', 'Ratanakiri', 'Kandal', 'Kratie', 'Stung Treng', 'Oddar Meanchey'],
        'CMR': ['Yaoundé', 'Douala', 'Bertoua', 'Garoua', 'Maroua', 'Kousseri', 'Bafoussam', 'Limbe', 'Nkongsamba', 'Ebolowa', 'Foumban', 'Dschang', 'Banyo', 'Bamenda', 'Tiko', 'Kribi', 'Meiganga', 'Yokadouma', 'Ambam', 'Bertoua'],
        'CAN': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Quebec City', 'Winnipeg', 'Hamilton', 'Kitchener', 'London', 'Victoria', 'Halifax', 'Oshawa', 'Brampton', 'Surrey', 'Richmond', 'Markham', 'Vaughan', 'Burnaby'],
        'CYM': ['George Town', 'West Bay', 'Bodden Town', 'East End', 'North Side', 'South Sound'],
        'CAF': ['Bangui', 'Bimbo', 'Berbérati', 'Bachara', 'Bouar', 'Carnot', 'Kaga-Bandoro', 'Sibut', 'Mbaïki', 'Boumango', 'Ippy', 'Nola', 'Yaloké', 'Damara', 'Kémo', 'Mongoumba', 'Bozoum', 'Nana-Mambéré', 'Boda', 'Alindao'],
        'TCD': ['N Djamena', 'Moundou', 'Sarh', 'Abéché', 'Kélo', 'Doba', 'Kousséri', 'Koundoul', 'Laï', 'Am Timan', 'Mongo', 'Faya-Largeau', 'Bongor', 'Chad', 'Ati', 'Biltine', 'Moussoro', 'Bitkine', 'Tibesti', 'Fada'],
        'CHL': ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca', 'Iquique', 'Puerto Montt', 'Arica', 'Coquimbo', 'Chillán', 'Curicó', 'Ovalle', 'San Antonio', 'Los Andes', 'Punta Arenas', 'Copiapó', 'Viña del Mar'],
        'CHN': ['Shanghai', 'Beijing', 'Chongqing', 'Tianjin', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Xi\'an', 'Dongguan', 'Hangzhou', 'Nanjing', 'Wuhan', 'Shenyang', 'Harbin', 'Suzhou', 'Qingdao', 'Dalian', 'Jinan', 'Zhengzhou', 'Changsha'],
        'CXR': ['Flying Fish Cove'],
        'CCK': ['West Island', 'Home Island', 'Direction Island', 'Horsburgh Island', 'South Island'],
        'COL': ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Soledad', 'Santa Marta', 'Ibagué', 'Pereira', 'Villavicencio', 'Manizales', 'Pasto', 'Valledupar', 'Montería', 'Neiva', 'Popayán', 'Armenia', 'Tunja'],
        'COM': ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Bandrani', 'Chindini', 'Voinjama', 'Nioumachoua', 'Djoiezi', 'Ouani'],
        'COD': ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Oyo', 'Nkayi', 'Makoua', 'Kinkala', 'Loango', 'Kindamba', 'Loubomo', 'Kouilou', 'Madingou', 'Bevouma', 'Brazzaville', 'Madingou', 'Oyo', 'Mossendjo', 'Lékana', 'Mayumba', 'Gamba'],
        'COK': ['Avarua', 'Arorangi', 'Nikao', 'Takitumu', 'Rangitoto', 'Vaimaanga', 'Mataora', 'Tamarua', 'Puaikura'],
        'CRI': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia', 'Puntarenas', 'Limon', 'San Isidro', 'Grecia', 'Escazú', 'Curridabat', 'Quesada', 'San Rafael', 'Tibas', 'Cañas', 'Perez Zeledon', 'San Carlos', 'Nicoya', 'Barva', 'San Vicente'],
        'HRV': ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Varazdin', 'Sisak', 'Pula', 'Dubrovnik', 'Šibenik', 'Karlovac', 'Požega', 'Vinkovci', 'Bjelovar', 'Vukovar', 'Cakovec', 'Samobor', 'Knin', 'Slavonski Brod', 'Petrinja'],
        'CUB': ['Havana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Guantánamo', 'Santa Clara', 'Las Tunas', 'Cienfuegos', 'Matanzas', 'Bayamo', 'Pinar del Río', 'Trinidad', 'Ciego de Ávila', 'Sancti Spíritus', 'Morón', 'Manzanillo', 'Baracoa', 'Granma', 'Villa Clara', 'Isla de la Juventud'],
        'CUW': ['Willemstad', 'Otrobanda', 'Punda', 'Santa Maria', 'Piscadera', 'Westpunt', 'Jan Thiel', 'Cortez', 'Banda Abou'],
        'CYP': ['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos', 'Kyrenia', 'Protaras', 'Paralimni', 'Lefka', 'Polis Chrysochous', 'Ayia Napa', 'Kiti', 'Deryneia', 'Pedhoulas', 'Kyperounta', 'Mandria', 'Kokkinochoria', 'Vouni', 'Aradippou', 'Xylotymbou'],
        'CZE': ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'Ústí nad Labem', 'Hradec Králové', 'Pardubice', 'Zlín', 'Kladno', 'Mladá Boleslav', 'Teplice', 'Chomutov', 'Karlovy Vary', 'Příbram', 'Opava', 'Jihlava', 'Tábor', 'Kolín'],
        'CIV': ['Abidjan', 'Bouaké', 'Daloa', 'San Pedro', 'Yamoussoukro', 'Korhogo', 'Man', 'Abengourou', 'Sassandra', 'San Pédro', 'Séguéla', 'Katiola', 'Bingerville', 'Divo', 'Agboville', 'Aboisso', 'Yopougon', 'Treichville', 'Marcory', 'Port-Bouët'],
        'DNK': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Glamsbjerg', 'Fredericia', 'Silkeborg', 'Nykøbing Falster', 'Hillerød', 'Ringsted', 'Holbæk', 'Sønderborg', 'Helsingør', 'Viborg', 'Korsør'],
        'DJI': ['Djibouti City', 'Ali Sabieh', 'Tadjourah', 'Dikhil', 'Obock', 'Arta'],
        'DMA': ['Roseau', 'Portsmouth', 'Marigot', 'Stockfarm', 'Béréna', 'Salisbury', 'La Plaine', 'Grand Bay', 'Castle Bruce', 'Eggleston'],
        'DOM': ['Santo Domingo', 'Santiago de los Caballeros', 'La Romana', 'San Pedro de Macorís', 'Puerto Plata', 'San Cristóbal', 'San Francisco de Macorís', 'Higuey', 'Moca', 'San Juan de la Maguana', 'Bani', 'Cotui', 'Jarabacoa', 'Barahona', 'Azua', 'La Vega', 'Boca Chica', 'Pedernales', 'Monte Cristi', 'Dajabón'],
        'ECU': ['Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Machala', 'Durán', 'Portoviejo', 'Manta', 'Loja', 'Ambato', 'Riobamba', 'Esmeraldas', 'Ibarra', 'Quevedo', 'Guaranda', 'Latacunga', 'Salinas', 'Rumiñahui', 'Babahoyo', 'Cayambe'],
        'EGY': ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Mansoura', 'Tanta', 'Asyut', 'Fayoum', 'Ismailia', 'Minya', 'Zagazig', 'Damanhur', 'Beni Suef', 'Luxor', 'Aswan', 'Sohag', 'Qena', 'Hurghada'],
        'SLV': ['San Salvador', 'Santa Ana', 'San Miguel', 'Mejicanos', 'Soyapango', 'Ahuachapán', 'La Unión', 'Chalatenango', 'Sonsonate', 'Usulután', 'Santa Tecla', 'Ilopango', 'Zacatecoluca', 'Coatepeque', 'La Libertad', 'San Vicente', 'Metapán', 'Jiquilisco', 'Conchagua', 'Panchimalco'],
        'GNQ': ['Malabo', 'Bata', 'Ebebiyin', 'Aconibe', 'Luba', 'Micomeseng', 'Evinayong', 'Cogo', 'Mbini', 'Bata'],
        'ERI': ['Asmara', 'Mendefera', 'Keren', 'Massawa', 'Dekemhare', 'Assab', 'Adi Keyh', 'Barentu', 'Keren', 'Teseney'],
        'EST': ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve', 'Rakvere', 'Jõhvi', 'Viljandi', 'Valga', 'Võru', 'Paide', 'Kuressaare', 'Keila', 'Sillamäe', 'Häädemeeste', 'Jõgeva', 'Türi', 'Kohila', 'Haapsalu', 'Läänemere'],
        'SWZ': ['Mbabane', 'Manzini', 'Lobamba', 'Nhlangano', 'Siteki', 'Big Bend', 'Piggs Peak', 'Bulembu', 'Matsapha', 'Bhunya'],
        'ETH': ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Bahir Dar', 'Hawassa', 'Adama', 'Gondar', 'Jimma', 'Shashamene', 'Dessie', 'Awasa', 'Harar', 'Woldia', 'Kombolcha', 'Sodo', 'Nazret', 'Bedele', 'Asosa', 'Negele Boran', 'Jijiga'],
        'FLK': ['Stanley', 'Goose Green', 'Port Howard', 'Fox Bay', 'Hill Cove', 'Port Stephens', 'Port San Carlos', 'North Arm', 'Port Edgar', 'Darwin'],
        'FRO': ['Tórshavn', 'Klaksvík', 'Runavík', 'Fuglafjørður', 'Tvøroyri', 'Hoyvík', 'Vágur', 'Sandavágur', 'Vestmanna', 'Sørvágur'],
        'FJI': ['Suva', 'Lautoka', 'Nadi', 'Labasa', 'Ba', 'Sigatoka', 'Savusavu', 'Rakiraki', 'Tavua', 'Nausori', 'Navua', 'Levuka', 'Korovou', 'Nasinu', 'Vatukoula', 'Seaqaqa', 'Nailaga', 'Naililili', 'Naweni', 'Waiyevo'],
        'FIN': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori', 'Joensuu', 'Lappeenranta', 'Hämeenlinna', 'Vaasa', 'Kotka', 'Rovaniemi', 'Seinäjoki', 'Mikkeli', 'Kokkola', 'Hyvinkää'],
        'FRA': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne'],
        'GUF': ['Cayenne', 'Saint-Laurent-du-Maroni', 'Kourou', 'Matoury', 'Rémire-Montjoly', 'Mana', 'Iracoubo', 'Sinnamary', 'Awala-Yalimapo', 'Maripasoula'],
        'PYF': ['Papeete', 'Faaa', 'Punaauia', 'Mahina', 'Arue', 'Moorea', 'Vaitape', 'Hiva Oa', 'Taihoae', 'Taravao'],
        'ATF': ['Port-aux-Français', 'Îles Kerguelen', 'Îles Crozet', 'Îles Saint-Paul et Amsterdam', 'Île Bouvet'],
        'GAB': ['Libreville', 'Port-Gentil', 'Franceville', 'Akan', 'Moanda', 'Lambaréné', 'Koulamoutou', 'Tchibanga', 'Bitam', 'Ovan'],
        'GMB': ['Banjul', 'Serrekunda', 'Brikama', 'Basse Santa Su', 'Latri Kunda', 'Farafenni', 'Gunjur', 'Bakau', 'Busumbala', 'Serekunda'],
        'GEO': ['Tbilisi', 'Kutaisi', 'Batumi', 'Zugdidi', 'Rustavi', 'Zestafoni', 'Gori', 'Sighnaghi', 'Telavi', 'Vani'],
        'DEU': ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Mannheim'],
        'GHA': ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman', 'Obuasi', 'Sunyani', 'Cape Coast', 'Koforidua', 'Sekondi-Takoradi'],
        'GIB': ['Gibraltar'],
        'GRC': ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Ioannina', 'Chania', 'Trikala', 'Serres', 'Kavala', 'Chalkida', 'Agrinio', 'Kalamata', 'Katerini', 'Rhodes', 'Alexandroupoli', 'Corinth', 'Lamia', 'Zakynthos'],
        'GRL': ['Nuuk', 'Sisimiut', 'Ilulissat', 'Qaqortoq', 'Aasiaat', 'Maniitsoq', 'Kangerlussuaq', 'Tasiilaq', 'Narsaq', 'Paamiut'],
        'GRD': ['St. George\'s', 'Gouyave', 'Grenville', 'Victoria', 'Beaulieu', 'Carriacou', 'Hillsborough', 'Sauteurs', 'Morne Jaloux', 'Lanse aux Epines'],
        'GLP': ['Basse-Terre', 'Les Abymes', 'Le Gosier', 'Pointe-à-Pitre', 'Saint-François', 'Baie-Mahault', 'Petit-Bourg', 'Le Moule', 'Sainte-Anne', 'Lamentin'],
        'GUM': ['Hagåtña', 'Dededo', 'Yigo', 'Mangilao', 'Barrigada', 'Tamuning', 'Sinajana', 'Agat', 'Merizo', 'Talofofo'],
        'GTM': ['Guatemala City', 'Mixco', 'Villa Nueva', 'Quetzaltenango', 'Escuintla', 'Santa Catarina Pinula', 'San Juan Sacatepéquez', 'Chimaltenango', 'Cobán', 'Mazatenango'],
        'GGY': ['St. Peter Port', 'St. Sampson', 'Torteval', 'Castel', 'Vale', 'St. Martin', 'St. Andrew', 'Forest', 'St. Ouen', 'Brecqhou'],
        'GIN': ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Faranah', 'Labé', 'Macenta', 'Pita', 'Siguiri', 'Boke'],
        'GNB': ['Bissau', 'Bafatá', 'Mansôa', 'Quebo', 'Gabú', 'Canchungo', 'Empada', 'Bolama', 'Pirada', 'Cacheu'],
        'GUY': ['Georgetown', 'Linden', 'New Amsterdam', 'Rosignol', 'Anna Regina', 'Skeldon', 'Bartica', 'Lethem', 'Mabaruma', 'Mahdia'],
        'HTI': ['Port-au-Prince', 'Cap-Haïtien', 'Hérri', 'Carrefour', 'Delmas', 'Jacmel', 'Les Cayes', 'Port-de-Paix', 'Gonaïves', 'Saint-Marc'],
        'VAT': ['Vatican City'],
        'HND': ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba', 'El Progreso', 'Comayagua', 'Juticalpa', 'Danlí', 'Santa Rosa de Copán', 'Tela'],
        'HKG': ['Hong Kong City', 'Kowloon', 'New Territories', 'Central and Western District', 'Eastern District', 'Southern District', 'Yau Tsim Mong', 'Sham Shui Po', 'Kwun Tong', 'Sai Kung'],
        'HUN': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Eger'],
        'ISL': ['Reykjavík', 'Kopavogur', 'Hafnarfjordur', 'Reykjanesbær', 'Akureyri', 'Thingeyri', 'Selfoss', 'Reykholt', 'Akranes', 'Egilsstadir'],
        'IND': ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Patna', 'Vadodara', 'Bhopal', 'Coimbatore', 'Kochi', 'Visakhapatnam'],
        'IDN': ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bekasi', 'Depok', 'Semarang', 'Tangerang', 'Palembang', 'Makassar', 'South Tangerang', 'Batam', 'Pekanbaru', 'Bogor', 'Bandar Lampung', 'Malang', 'Padang', 'Denpasar', 'Samarinda', 'Tasikmalaya'],
        'IRN': ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Shiraz', 'Tabriz', 'Qom', 'Ahvaz', 'Kermanshah', 'Urmia', 'Rasht', 'Zahedan', 'Hamadan', 'Arak', 'Yazd', 'Bandar Abbas', 'Khorramabad', 'Kerman', 'Sanandaj', 'Abadan'],
        'IRQ': ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf', 'Karbala', 'Kirkuk', 'Sulaymaniyah', 'Nasiriyah', 'Diwaniyah', 'Amarah', 'Ramadi', 'Hillah', 'Dohuk', 'Tikrit', 'Samawah', 'Fallujah', 'Baqubah', 'Kut', 'Tal Afar'],
        'IRL': ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Bray', 'Swords', 'Navan', 'Ennis', 'Tralee', 'Carlow', 'Newbridge', 'Portlaoise', 'Balbriggan', 'Naas', 'Athlone', 'Mullingar', 'Letterkenny'],
        'IMN': ['Douglas', 'Peel', 'Ramsey', 'Castletown', 'Port Erin', 'Port St Mary', 'Laxey', 'Onchan', 'Ballasalla', 'Kirk Michael'],
        'ISR': ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beersheba', 'Bnei Brak', 'Holon', 'Ramat Gan', 'Ashkelon', 'Bat Yam', 'Rehovot', 'Herzliya', 'Kfar Saba', 'Hadera', 'Modi\'in-Maccabim-Re\'ut', 'Nazareth', 'Lod'],
        'ITA': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Verona', 'Venice', 'Messina', 'Padua', 'Trieste', 'Taranto', 'Brescia', 'Prato', 'Modena', 'Reggio Calabria'],
        'JAM': ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore', 'Mandeville', 'May Pen', 'Old Harbour', 'Savanna-la-Mar', 'Ocho Rios', 'Linstead'],
        'JPN': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama', 'Hiroshima', 'Sendai', 'Kitakyushu', 'Chiba', 'Sakai', 'Niigata', 'Hamamatsu', 'Shizuoka', 'Okayama', 'Kumamoto'],
        'JEY': ['Saint Helier', 'Saint Saviour', 'Saint Brelade', 'Saint Clement', 'Saint Lawrence', 'Saint Peter', 'Saint Ouen', 'Grouville', 'Saint John', 'Saint Martin'],
        'JOR': ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 'Maan', 'Salt', 'Karak', 'Tafilah', 'Russeifa'],
        //Continue later with Kazakhstan
        'KAZ': ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe', 'Taraz', 'Pavlodar', 'Oskemen', 'Semey', 'Kostanay', 'Kyzylorda', 'Atyrau', 'Petropavl', 'Oral', 'Temirtau', 'Turkistan', 'Taldykorgan', 'Ekibastuz', 'Zhanaozen', 'Rudny'],
        'KEN': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kitale', 'Malindi', 'Garissa', 'Kakamega', 'Nyeri', 'Embu', 'Naivasha', 'Machakos', 'Meru', 'Lamu', 'Bungoma', 'Voi', 'Kericho', 'Homa Bay'],
        'KIR': ['South Tarawa', 'Betio', 'Bikenibeu', 'Teaoraereke', 'Buota', 'Bonriki', 'Nanikai', 'Bairiki', 'Temwaiku', 'Eita'],
        'PRK': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam', 'Goyang', 'Yongin', 'Bucheon', 'Ansang', 'Cheongju', 'Jeonju', 'Namyangju', 'Jeju City', 'Cheonan', 'Pohang'],
        'KWT': ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Al Jahra', 'Salmiya', 'Sabah as Salim', 'Ar Rumaythah', 'Al Fintas', 'Al Jahrah'],
        'KGZ': ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol', 'Tokmok', 'Talas', 'Kant', 'Kyzyl-Kiya', 'Batken', 'Naryn'],
        'LAO': ['Vientiane', 'Savannakhet', 'Pakse', 'Luang Prabang', 'Thakhek', 'Phonsavan', 'Muang Xay', 'Ban Houayxay', 'Pakse', 'Saravan'],
        'LVA': ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala', 'Ventspils', 'Rēzekne', 'Valmiera', 'Jēkabpils', 'Ogre'],
        'LBN': ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos', 'Baalbek', 'Jounieh', 'Zahle', 'Batroun', 'Aley'],
        'LSO': ['Maseru', 'Teyateyaneng', 'Hlotse', 'Mohale\'s Hoek', 'Quthing', 'Mafeteng', 'Butha-Buthe', 'Qacha\'s Nek', 'Mohlanapeng', 'Maputsoe'],
        'LBR': ['Monrovia', 'Gbarnga', 'Bensonville', 'Kakata', 'Buchanan', 'Zwedru', 'Voinjama', 'Harper', 'Sinoe', 'Bopolu'],
        'LBY': ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya', 'Ajdabiya', 'Al Khums', 'Tobruk', 'Zliten', 'Ghadames'],
        'LIE': ['Vaduz', 'Schaan', 'Triesen', 'Balzers', 'Eschen', 'Mauren', 'Ruggell', 'Planken', 'Gamprin', 'Schellenberg'],
        'LTU': ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena'],
        'LUX': ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Ettelbruck', 'Diekirch', 'Bertrange', 'Strassen', 'Berchem', 'Remich'],
        'MCO': ['Sé', 'Nossa Senhora de Fátima', 'São Lázaro', 'Santo António', 'Ilha Verde', 'Taipa', 'Coloane'],
        'MDG': ['Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa', 'Mahajanga', 'Toliara', 'Antsiranana', 'Morondava', 'Ambatondrazaka', 'Farafangana', 'Manakara', 'Ihosy', 'Fenoarivo Atsinanana', 'Sambava', 'Ambohimahasoa', 'Betafo', 'Andapa', 'Vangaindrano', 'Mananjary', 'Maroantsetra'],
        'MWI': ['Lilongwe', 'Blantyre', 'Mzuzu', 'Kasungu', 'Mangochi', 'Karonga', 'Salima', 'Nkhotakota', 'Chikwawa', 'Dedza'],
        'MYS': ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Petaling Jaya', 'Johor Bahru', 'Kota Kinabalu', 'Kuching', 'Seremban', 'Alor Setar', 'Melaka City', 'Kuantan', 'Sungai Petani', 'Miri', 'Sandakan', 'Taiping', 'Batu Pahat', 'Kuala Terengganu', 'Sibu', 'Kuala Selangor'],
        'MDV': ['Malé', 'Addu City', 'Fuvahmulah', 'Kulhudhuffushi', 'Thinadhoo', 'Hithadhoo', 'Eydhafushi', 'Maafushi', 'Dhidhdhoo', 'Viligili'],
        'MLI': ['Bamako', 'Sikasso', 'Koutiala', 'Mopti', 'Kayes', 'Segou', 'Gao', 'Kidal', 'Tombouctou', 'Kayes', 'Kolokani', 'Bougouni', 'Yorosso', 'Niono', 'Kangaba', 'Dioila', 'San', 'Bandiagara', 'Kita', 'Bla'],
        'MLT': ['Valletta', 'Birkirkara', 'Mosta', 'Qormi', 'Sliema', 'Marsa', 'Zebbug', 'Rabat', 'St. Julian’s', 'Floriana'],
        'MHL': ['Majuro', 'Ebeye', 'Jaluit', 'Wotje', 'Kwajalein', 'Maloelap', 'Ailuk', 'Arno', 'Lae', 'Jabat'],
        'MTQ': ['Fort-de-France', 'Le Lamentin', 'Schoelcher', 'Rivière-Pilote', 'Saint-Joseph', 'Le Robert', 'Saint-Esprit', 'Le François', 'La Trinité', 'Les Trois-Îlets'],
        'MRT': ['Nouakchott', 'Nouadhibou', 'Kiffa', 'Rosso', 'Kaédi', 'Zouérat', 'Atar', 'Selibaby', 'Boutilimit', 'Néma'],
        'MUS': ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes', 'Triolet', 'Goodlands', 'Centre de Flacq', 'Mahébourg', 'Petit Raffray'],
        'MYT': ['Mamoudzou', 'Dzaoudzi', 'Koungou', 'Bandraboua', 'Tsingoni', 'Chirongui', 'Mtsamboro', 'Acoua', 'Ouangani', 'Bouéni'],
        'MEX': ['Mexico City', 'Ecatepec', 'Guadalajara', 'Puebla', 'Juárez', 'Tijuana', 'León', 'Zapopan', 'Monterrey', 'Nezahualcóyotl', 'Mérida', 'Chihuahua', 'Cancún', 'Toluca', 'Saltillo', 'Aguascalientes', 'Hermosillo', 'Morelia', 'Querétaro', 'Mexicali'],
        'FSM': ['Palikir', 'Weno', 'Kolonia', 'Tonoas', 'Duk', 'Sapwuahfik', 'Pohnpei', 'Chuuk', 'Kosrae', 'Yap'],
        'MDA': ['Chișinău', 'Tiraspol', 'Bălți', 'Bender', 'Rîbnița', 'Cahul', 'Ungheni', 'Orhei', 'Soroca', 'Comrat'],
        'MCO': ['Monte Carlo', 'La Condamine', 'Monaco-Ville', 'Fontvieille', 'Moneghetti', 'Larvotto', 'Jardin Exotique', 'Saint-Roman', 'La Rousse', 'Les Révoires'],
        'MNG': ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Choibalsan', 'Mörön', 'Zuunmod', 'Baruun-Urt', 'Ölgii', 'Dalandzadgad', 'Bulgan'],
        'MNE': ['Podgorica', 'Nikšić', 'Herceg Novi', 'Pljevlja', 'Berane', 'Cetinje', 'Bijelo Polje', 'Bar', 'Tivat', 'Ulcinj'],
        'MSR': ['Brades', 'Plymouth', 'Little Bay', 'St. Peter’s', 'Olveston', 'Georgetown', 'Daly Bay', 'Woodlands', 'Kinsale', 'Lookout'],
        'MAR': ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Salé', 'Meknès', 'Oujda', 'Kenitra', 'Agadir', 'Tetouan', 'Temara', 'Safi', 'Khouribga', 'El Jadida', 'Beni Mellal', 'Nador', 'Ksar El Kebir', 'Larache', 'Khemisset', 'Settat'],
        'MOZ': ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio', 'Nacala', 'Quelimane', 'Tete', 'Xai-Xai', 'Lichinga', 'Maxixe', 'Angoche', 'Montepuez', 'Cuamba', 'Pemba', 'Dondo', 'Mocuba', 'Gurué', 'Marrupa', 'Vilankulo'],
        'MMR': ['Yangon', 'Mandalay', 'Naypyidaw', 'Mawlamyine', 'Bago', 'Taunggyi', 'Pathein', 'Myitkyina', 'Sittwe', 'Monywa', 'Meiktila', 'Myeik', 'Hpa-An', 'Dawei', 'Pyay', 'Kyaikto', 'Magway', 'Pyin Oo Lwin', 'Thaton', 'Hinthada'],
        'NAM': ['Windhoek', 'Rundu', 'Walvis Bay', 'Oshakati', 'Swakopmund', 'Ongwediva', 'Otjiwarongo', 'Katima Mulilo', 'Okahandja', 'Gobabis', 'Keetmanshoop', 'Mariental', 'Nkurenkuru', 'Lüderitz', 'Opuwo', 'Tsumeb', 'Outapi', 'Grootfontein', 'Rehoboth', 'Divundu'],
        'NRU': ['Yaren', 'Denigomodu', 'Nibok', 'Aiwo', 'Buada', 'Meneng', 'Anabar', 'Anibare', 'Boe', 'Uaboe'],
        'NPL': ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Birgunj', 'Bharatpur', 'Dharan', 'Janakpur', 'Butwal', 'Hetauda', 'Nepalgunj', 'Dhangadhi', 'Itahari', 'Rajbiraj', 'Bhaktapur', 'Tulsipur', 'Ghorahi', 'Mechinagar', 'Jaleshwar', 'Dipayal'],
        'NLD': ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen', 'Apeldoorn', 'Haarlem', 'Arnhem', 'Zaanstad', 'Amersfoort', '’s-Hertogenbosch', 'Haarlemmermeer', 'Zoetermeer', 'Leiden', 'Dordrecht'],
        'NCL': ['Nouméa', 'Mont-Dore', 'Dumbéa', 'Païta', 'Koné', 'Pouembout', 'Boulouparis', 'La Foa', 'Lifou', 'Hienghène'],
        'NZL': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Lower Hutt', 'Dunedin', 'Palmerston North', 'Napier-Hastings', 'Rotorua', 'Whangārei', 'New Plymouth', 'Invercargill', 'Wanganui', 'Gisborne', 'Timaru', 'Masterton', 'Bluff', 'Blenheim', 'Taupō'],
        'NCA': ['Managua', 'León', 'Masaya', 'Chinandega', 'Estelí', 'Matagalpa', 'Jinotepe', 'Jinotega', 'Granada', 'Nueva Guinea', 'Bluefields', 'Somoto', 'Ocotal', 'Rivas', 'Juigalpa', 'Tipitapa', 'Boaco', 'El Viejo', 'Villa El Carmen', 'La Paz Centro'],
        'NER': ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua', 'Dosso', 'Diffa', 'Tillabéri', 'Gaya', 'Téra', 'Goure', 'Birni-N’Konni', 'Arlit', 'Filingue', 'Dosso', 'Falmey', 'Mirriah', 'Magaria', 'Kirtachi', 'Madaoua'],
        'NGA': ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt', 'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos', 'Ilorin', 'Oyo', 'Enugu', 'Ondo', 'Akure', 'Calabar', 'Kaduna', 'Bauchi', 'Uyo', 'Makurdi'],
        //Continue later with Niue
        'NIU': ['Alofi', 'Hakupu', 'Avatele', 'Mutalau', 'Tuapa', 'Lakepa', 'Liku', 'Namukulu', 'Makefu', 'Hikutavake', 'Toi', 'Vaiea', 'Tamakautoga'],
        'NFK': ['Kingston', 'Burnt Pine', 'Cascade', 'Anson Bay', 'Ball Bay', 'Emily Bay', 'Longridge', 'Rocky Point', 'Steeles Point', 'Middlegate', 'Mount Pitt', 'Rooty Hill', 'Red Road', 'Point Hunter', 'Bumboras', 'New Cascade', 'Driver Christian', 'Hundred Acres', 'The Ridge', 'Two Chimneys'],
        'MNP': ['Saipan', 'Garapan', 'Kagman', 'Susupe', 'San Roque', 'Chalan Kanoa', 'Tanapag', 'Chalan Piao', 'San Vicente', 'Capitol Hill', 'Koblerville', 'Dandan', 'Oleai', 'Achugao', 'Tinian', 'Songsong', 'San Jose', 'Rota', 'Sinapalo', 'Alamagan'],
        'NOR': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Tromsø', 'Sandnes', 'Skien', 'Ålesund', 'Haugesund', 'Tønsberg', 'Moss', 'Porsgrunn', 'Bodø', 'Arendal', 'Hamar', 'Larvik', 'Halden'],
        'OMN': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Buraimi', 'Rustaq', 'Ibra', 'Muttrah', 'Khasab', 'Shinas', 'Bidbid', 'Saham', 'Al Suwaiq', 'Bahla', 'Seeb', 'Al Hamra', 'Adam', 'Jalan Bani Bu Ali'],
        'PAK': ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Peshawar', 'Quetta', 'Islamabad', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Jhang', 'Sheikhupura', 'Mardan', 'Kasur', 'Okara', 'Dera Ghazi Khan', 'Gujrat', 'Chiniot'],
        'PLW': ['Ngerulmud', 'Koror', 'Melekeok', 'Airai', 'Ngardmau', 'Ngchesar', 'Ngatpang', 'Ngaraard', 'Ngarchelong', 'Ngaremlengui', 'Peleliu', 'Aimeliik', 'Kayangel', 'Ollei', 'Mokko', 'Kloulklubed', 'Ikelau', 'Dngeronger', 'Ngkeklau', 'Choll'],
        'PSE': ['Gaza', 'Hebron', 'Nablus', 'Ramallah', 'Jenin', 'Bethlehem', 'Tulkarm', 'Qalqilya', 'Salfit', 'Jericho', 'Khan Yunis', 'Deir al-Balah', 'Rafah', 'Beit Jala', 'Beit Sahour', 'Jerusalem', 'Tubas', 'Dura', 'Al-Bireh', 'Halhul'],
        'PAN': ['Panama City', 'Colón', 'David', 'La Chorrera', 'Santiago', 'Chitré', 'Penonomé', 'Puerto Armuelles', 'Las Tablas', 'San Miguelito', 'Aguadulce', 'Bocas del Toro', 'Changuinola', 'Herrera', 'Boquete', 'Ocú', 'Natá', 'Sona', 'Tonosi', 'Arraiján'],
        'PNG': ['Port Moresby', 'Lae', 'Mount Hagen', 'Madang', 'Kokopo', 'Arawa', 'Goroka', 'Kimbe', 'Wewak', 'Mendi', 'Bulolo', 'Popondetta', 'Vanimo', 'Alotau', 'Kainantu', 'Kavieng', 'Wabag', 'Porgera', 'Buka', 'Kiunga'],
        'PRY': ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Encarnación', 'Concepción', 'Pedro Juan Caballero', 'Caaguazú', 'Coronel Oviedo', 'Caacupé', 'Villarrica', 'Itauguá', 'Salto del Guairá', 'Ypacaraí', 'Hernandarias', 'San Estanislao', 'Ñemby'],
        'PER': ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco', 'Iquitos', 'Huancayo', 'Tacna', 'Puno', 'Chimbote', 'Ica', 'Sullana', 'Juliaca', 'Pucallpa', 'Ayacucho', 'Tumbes', 'Cajamarca', 'Huaraz', 'Moquegua'],
        'PHL': ['Manila', 'Quezon City', 'Caloocan', 'Davao City', 'Cebu City', 'Zamboanga City', 'Antipolo', 'Pasig', 'Taguig', 'Cagayan de Oro', 'Parañaque', 'Dasmariñas', 'Valenzuela', 'General Santos', 'Bacoor', 'Makati', 'Imus', 'Mandaue', 'Santa Rosa', 'Baguio'],
        'PCN': ['Adamstown', 'Down Rope', 'Flower Valley', 'Harbour View', 'Martin’s Cellars', 'Naughty Bay', 'Northwest Bay', 'Resolution Bay', 'The Anchorage', 'The Grotto', 'Western Settlement', 'Young’s Valley', 'Battery', 'St Paul’s Point', 'Bottom’s Valley', 'Headlands', 'Upper Terrace', 'Lower Terrace', 'Corner Bay', 'Longridge'],
        'POL': ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Toruń', 'Kielce', 'Gliwice', 'Zabrze', 'Olsztyn', 'Rzeszów'],
        'PRT': ['Lisboa', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Coimbra', 'Funchal', 'Setúbal', 'Queluz', 'Agualva-Cacém', 'Almada', 'Cascais', 'Loures', 'Viseu', 'Faro', 'Guimarães', 'Aveiro', 'Matosinhos', 'Odivelas', 'Leiria'],
        'PRI': ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 'Arecibo', 'Fajardo', 'Humacao', 'Mayagüez', 'Toa Baja', 'Trujillo Alto', 'Cayey', 'Yauco', 'Vega Baja', 'Hatillo', 'Aguadilla', 'Adjuntas', 'Coamo', 'Isabela'],
        'QAT': ['Doha', 'Al Rayyan', 'Umm Salal Muhammad', 'Al Wakrah', 'Al Khor', 'Al Shamal', 'Mesaieed', 'Al Daayen', 'Al Ghuwariyah', 'Ras Laffan', 'Dukhan', 'Abu Samra', 'Al Jumail', 'Al Zubarah', 'Simaisma', 'Al Thakhira', 'Al Ruwais', 'Al Mazrouah', 'Al Shahaniya', 'Al Wakrah South'],
        'MKD': ['Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo', 'Veles', 'Ohrid', 'Gostivar', 'Štip', 'Kavadarci', 'Strumica', 'Kičevo', 'Radoviš', 'Gevgelija', 'Debar', 'Kočani', 'Kratovo', 'Negotino', 'Resen', 'Struga'],
        'ROU': ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Brașov', 'Galați', 'Ploiești', 'Oradea', 'Brăila', 'Arad', 'Pitești', 'Sibiu', 'Bacău', 'Târgu Mureș', 'Baia Mare', 'Buzău', 'Satu Mare', 'Râmnicu Vâlcea'],
        'RUS': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don', 'Ufa', 'Krasnoyarsk', 'Voronezh', 'Perm', 'Volgograd', 'Krasnodar', 'Saratov', 'Tyumen', 'Tolyatti', 'Izhevsk'],
        'RWA': ['Kigali', 'Butare', 'Gisenyi', 'Ruhengeri', 'Kibuye', 'Cyangugu', 'Byumba', 'Kibungo', 'Gitarama', 'Muhanga', 'Nyundo', 'Musanze', 'Nyagatare', 'Rwamagana', 'Kayonza', 'Rulindo', 'Nyanza', 'Karongi', 'Ngoma', 'Burera'],
        'REU': ['Saint-Denis', 'Saint-Paul', 'Saint-Pierre', 'Saint-André', 'Saint-Louis', 'Le Tampon', 'Saint-Benoît', 'Cilaos', 'La Possession', 'Saint-Joseph', 'Sainte-Marie', 'Bras-Panon', 'Saint-Leu', 'Petite-Île', 'Salazie', 'Entre-Deux', 'Les Avirons', 'L’Étang-Salé', 'Le Port', 'La Plaine des Palmistes'],
        'BLM': ['Gustavia', 'Saint-Jean', 'Corossol', 'Lorient', 'Colombier', 'Anse des Cayes', 'Anse de Grand Cul de Sac', 'Public', 'Toiny', 'Marigot', 'Cul-de-Sac', 'Anse de Marigot', 'Petit Cul de Sac', 'Cheval Blanc', 'Vitet', 'Pointe Milou', 'Gouverneur', 'Lorient Bay', 'Saline', 'Petit Anse'],
        'SHN': ['Jamestown', 'Half Tree Hollow', 'Longwood', 'Blue Hill', 'Alarm Forest', 'Levelwood', 'St Paul', 'St Helena Airport', 'Georgetown', 'Two Boats', 'Harford', 'Cathedral', 'Tristan da Cunha', 'Edinburgh of the Seven Seas', 'Calshot', 'Levelwood', 'Farm', 'Donkey Plain', 'Head O\'Wain', 'Thompson’s Wood'],
        'KNA': ['Basseterre', 'Charlestown', 'Sandy Point Town', 'Dieppe Bay Town', 'Cayon', 'Old Road Town', 'St. Paul’s', 'Monkey Hill', 'Molyneux', 'Tabernacle', 'Newton Ground', 'Bardens', 'West Farm', 'Newcastle', 'Hammond', 'Boyds', 'Browns', 'Newcastle', 'Parsons', 'Dieppe Bay'],
        'LCA': ['Castries', 'Vieux Fort', 'Gros Islet', 'Soufrière', 'Anse La Raye', 'Micoud', 'Dennery', 'Babonneau', 'Monchy', 'Mabouya Valley', 'Laborie', 'Choiseul', 'Canaries', 'Marchand', 'Praslin', 'La Tourney', 'Roseau', 'Fond St. Jacques', 'Augier', 'Morne Fortune'],
        'MAF': ['Marigot', 'Grand Case', 'Oyster Pond', 'Belle Vue', 'Cul-de-Sac', 'Anse Marcel', 'Happy Bay', 'Simpson Bay', 'Pelican Key', 'Baie Nettlé', 'Baie Rouge', 'Friar’s Bay', 'La Savane', 'Terres Basses', 'Hope Estate', 'Mont Vernon', 'La Samanna', 'Pic Paradis', 'Lowlands', 'Concordia'],
        'SPM': ['Saint-Pierre', 'Miquelon', 'Langlade', 'Saint-Pierre Harbor', 'Anse aux Soldats', 'Grand Barachois', 'Pointe aux Canons', 'Anse à la Baleine', 'La Dune', 'Le Cap', 'La Quarantaine', 'Bellevue', 'La Roche', 'La Butte', 'L’Île aux Marins', 'Anse du Gouverneur', 'Pointe Plate', 'La Croix', 'Rivière à l’Île', 'Baie aux Galets'],
        'VCT': ['Kingstown', 'Georgetown', 'Barrouallie', 'Chateaubelair', 'Port Elizabeth', 'Layou', 'Calliaqua', 'Dundas', 'Biabou', 'Richland Park', 'Edinboro', 'Mesopotamia', 'Stubbs', 'North Union', 'South Rivers', 'Langley Park', 'Gomes', 'Fancy', 'Troumaca', 'Campden Park'],
        'WSM': ['Apia', 'Vaitele', 'Faleula', 'Siusega', 'Afega', 'Lepea', 'Satupaitea', 'Lufilufi', 'Salelologa', 'Safotu', 'Vaiafai', 'Fagalii', 'Lotofaga', 'Auala', 'Matatufu', 'Falealupo', 'Siumu', 'Tufutafoe', 'Saleimoa', 'Vailoa'],
        'SMR': ['San Marino', 'Serravalle', 'Borgo Maggiore', 'Domagnano', 'Faetano', 'Fiorentino', 'Acquaviva', 'Chiesanuova', 'Cailungo', 'Falciano', 'Poggio Casalino', 'Montegiardino', 'Gualdicciolo', 'Dogana', 'Molarini', 'Valdragone', 'Cerasolo', 'Fiorina', 'Cà Melone', 'Rovereta'],
        'STP': ['São Tomé', 'Santo António', 'Trindade', 'Neves', 'Santa Catarina', 'Santana', 'Santa Cruz', 'Praia Melão', 'Guadalupe', 'Bombom', 'Agostinho Neto', 'São João dos Angolares', 'Micoló', 'Morgado', 'Porto Alegre', 'Uba Budo', 'Diogo Vaz', 'Pantufo', 'Monte Café', 'São Marçal'],
        'SAU': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran', 'Tabuk', 'Buraidah', 'Khamis Mushait', 'Al Hofuf', 'Najran', 'Hail', 'Jubail', 'Ta’if', 'Al Qatif', 'Yanbu', 'Al Bahah', 'Sakakah', 'Abha'],
        'SEN': ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba', 'Mbour', 'Diourbel', 'Tambacounda', 'Louga', 'Fatick', 'Kolda', 'Sédhiou', 'Matam', 'Kédougou', 'Ranérou', 'Kaffrine', 'Bakel', 'Guédiawaye', 'Pikine'],
        'SRB': ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo', 'Čačak', 'Kruševac', 'Smederevo', 'Leskovac', 'Valjevo', 'Šabac', 'Vranje', 'Sombor', 'Požarevac', 'Kraljevo', 'Bor', 'Pirot', 'Prokuplje'],
        'SYC': ['Victoria', 'Anse Boileau', 'Anse aux Pins', 'Baie Lazare', 'Beau Vallon', 'Bel Ombre', 'Bel Air', 'Bel Eau', 'Glacis', 'Grand Anse', 'La Misère', 'La Digue', 'Mont Buxton', 'Mont Fleuri', 'Pointe La Rue', 'Port Glaud', 'Roche Caiman', 'Saint Louis', 'Takamaka', 'Takamaka East'],
        'SLE': ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu', 'Port Loko', 'Moyamba', 'Bonthe', 'Kabala', 'Pujehun', 'Kambia', 'Mattru', 'Magburaka', 'Yengema', 'Mile 91', 'Kailahun', 'Pendembu', 'Baiima', 'Masingbi', 'Bumpe'],
        'SGP': ['Central Area', 'Bukit Timah', 'Jurong East', 'Jurong West', 'Pasir Ris', 'Tampines', 'Woodlands', 'Sengkang', 'Punggol', 'Yishun', 'Ang Mo Kio', 'Bishan', 'Bedok', 'Choa Chu Kang', 'Clementi', 'Geylang', 'Hougang', 'Kallang', 'Marine Parade', 'Novena'],
        //Continue later with Sint Maarten
        'SXM': ['Philipsburg', 'Simpson Bay', 'Cole Bay', 'Cupecoy', 'Maho', 'Pointe Blanche', 'Belair', 'Dutch Quarter', 'Middle Region', 'Cay Hill', 'Cul de Sac', 'Sucker Garden', 'Guana Bay', 'Beacon Hill', 'Pelican Key', 'Lowlands', 'Madame Estate', 'Over the Bank', 'Saunders', 'St. Peters'],
        'SVK': ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra', 'Banská Bystrica', 'Trnava', 'Martin', 'Trenčín', 'Poprad', 'Prievidza', 'Zvolen', 'Považská Bystrica', 'Michalovce', 'Komárno', 'Spišská Nová Ves', 'Levice', 'Lučenec', 'Ružomberok', 'Pezinok'],
        'SVN': ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje', 'Koper', 'Novo Mesto', 'Ptuj', 'Trbovlje', 'Kamnik', 'Jesenice', 'Domžale', 'Murska Sobota', 'Nova Gorica', 'Slovenj Gradec', 'Izola', 'Kočevje', 'Sežana', 'Postojna', 'Litija'],
        'SLB': ['Honiara', 'Gizo', 'Auki', 'Noro', 'Tulagi', 'Kirakira', 'Buala', 'Lata', 'Taro Island', 'Ringi Cove', 'Buala', 'Isabel', 'Buala Point', 'Makira', 'Malaita', 'Yandina', 'Munda', 'Buala Station', 'Batuna', 'Kolombangara'],
        'SOM': ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa', 'Galkayo', 'Garowe', 'Berbera', 'Borama', 'Beledweyne', 'Qardho', 'Jowhar', 'Burao', 'Marka', 'Afgooye', 'Dhobley', 'Luuq', 'Garoowe', 'Eyl', 'Las Anod'],
        'ZAF': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Polokwane', 'Kimberley', 'Mbombela', 'Pietermaritzburg', 'Rustenburg', 'George', 'Mthatha', 'Welkom', 'Vereeniging', 'Gqeberha', 'Tembisa', 'Soweto', 'Benoni'],
        'SGS': ['Grytviken', 'King Edward Point', 'Leith Harbour', 'Husvik', 'Stromness', 'Prince Olav Harbour', 'Ocean Harbour', 'Godthul', 'Cumberland Bay', 'Gold Harbour', 'Drygalski Fjord', 'Cooper Bay', 'Royal Bay', 'Elsehul', 'Bay of Isles', 'Cape Rosa', 'Cape Disappointment', 'Mount Paget', 'Allardyce Range', 'Fortuna Bay'],
        'SSD': ['Juba', 'Wau', 'Malakal', 'Bor', 'Yei', 'Rumbek', 'Aweil', 'Torit', 'Bentiu', 'Kuajok', 'Maridi', 'Tonj', 'Nimule', 'Yambio', 'Kodok', 'Abyei', 'Tumbura', 'Leer', 'Pibor', 'Lakes'],
        'ESP': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Granada', 'Elche', 'Oviedo', 'Santander', 'Tarragona'],
        'LKA': ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Batticaloa', 'Trincomalee', 'Anuradhapura', 'Ratnapura', 'Badulla', 'Matara', 'Kurunegala', 'Nuwara Eliya', 'Puttalam', 'Kalutara', 'Matale', 'Hambantota', 'Chilaw', 'Vavuniya', 'Ampara'],
        'SDN': ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala', 'El Obeid', 'Nyala', 'Al-Fashir', 'Sennar', 'Kadugli', 'El Geneina', 'Wad Madani', 'Dongola', 'Ed Damer', 'Zalingei', 'Halfa', 'Atbara', 'Kosti', 'Rabak', 'Muglad', 'Torit'],
        'SUR': ['Paramaribo', 'Lelydorp', 'Nieuw Nickerie', 'Moengo', 'Albina', 'Marowijne', 'Commewijne', 'Brokopondo', 'Moengo', 'Onverwacht', 'Zanderij', 'Wageningen', 'Totness', 'Domburg', 'Bakkie', 'Nieuw Amsterdam', 'Benzdorp', 'Jodensavanne', 'Galibi', 'Tamanredjo'],
        'SJM': ['Longyearbyen', 'Barentsburg', 'Ny-Ålesund', 'Pyramiden', 'Sveagruva', 'Hornsund', 'Svalbard Airport', 'Reindalen', 'Isfjord Radio', 'Kongsfjord', 'Kapp Linné', 'Trollheimen', 'Tempelfjorden', 'Adventdalen', 'Smeerenburg', 'Fuglefjord', 'Bjørndalen', 'Colesbukta', 'Mosselbukta', 'De Geerdalen'],
        'SWE': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå', 'Gävle', 'Borås', 'Eskilstuna', 'Södertälje', 'Karlstad', 'Täby', 'Halmstad', 'Växjö'],
        'CHE': ['Aargau', 'Appenzell Innerrhoden', 'Appenzell Ausserrhoden', 'Bern', 'Basel-Landschaft', 'Basel-Stadt', 'Freiburg', 'Glarus', 'Graubünden', 'Jura', 'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'St. Gallen', 'Schaffhausen', 'Solothurn', 'Schwyz', 'Thurgau', 'Tessin', 'Uri', 'Waadt', 'Wallis', 'Zug', 'Zürich'],
        'SYR': ['Damaskus', 'Aleppo', 'Homs', 'Hama', 'Latakia', 'Deir ez-Zor', 'Raqqa', 'Tartus', 'Qamishli', 'Al-Hasakah', 'Daraa', 'Idlib', 'Al-Suwayda', 'Manbij', 'Douma', 'Al-Bab', 'Azaz', 'Afrin', 'Jableh', 'Saraqib'],
        'TWN': ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hsinchu', 'Keelung', 'Chiayi', 'Changhua', 'Yilan', 'Pingtung', 'Miaoli', 'Nantou', 'Hualien', 'Taitung', 'Yunlin', 'Penghu', 'Magong', 'Douliu', 'Jinhu', 'Zhubei'],
        'TJK': ['Dushanbe', 'Khujand', 'Kulob', 'Qurghonteppa', 'Istaravshan', 'Tursunzoda', 'Konibodom', 'Vahdat', 'Pendjikent', 'Isfara', 'Khorugh', 'Rudaki', 'Farkhor', 'Chkalovsk', 'Yovon', 'Norak', 'Panjakent', 'Shahritus', 'Kulyab', 'Danghara'],
        'TZA': ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Morogoro', 'Tanga', 'Kigoma', 'Zanzibar City', 'Tabora', 'Moshi', 'Iringa', 'Sumbawanga', 'Musoma', 'Shinyanga', 'Lindi', 'Mpanda', 'Kahama', 'Njombe', 'Bukoba'],
        'THA': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima', 'Udon Thani', 'Khon Kaen', 'Chiang Rai', 'Nakhon Si Thammarat', 'Surat Thani', 'Rayong', 'Chonburi', 'Lampang', 'Phitsanulok', 'Trang', 'Sisaket', 'Yala', 'Loei', 'Mukdahan'],
        'TLS': ['Dili', 'Baucau', 'Maliana', 'Liquiçá', 'Suai', 'Viqueque', 'Aileu', 'Lospalos', 'Oecusse', 'Manatuto', 'Ermera', 'Same', 'Atauro', 'Lautém', 'Covalima', 'Bobonaro', 'Ainaro', 'Metinaro', 'Zumalai', 'Hatolia'],
        'TGO': ['Lomé', 'Sokodé', 'Kara', 'Dapaong', 'Atakpamé', 'Kpalimé', 'Aného', 'Tsévié', 'Tchamba', 'Bassar', 'Aneho', 'Niamtougou', 'Cinkassé', 'Mango', 'Bafilo', 'Kpagouda', 'Pagouda', 'Tône', 'Blitta', 'Tchamba'],
        'TKL': ['Fakaofo', 'Nukunonu', 'Atafu', 'Te Nuku', 'Taulaga', 'Mutalau', 'Hutuna', 'Fale', 'Loto', 'Matautu', 'Tufou', 'Taula', 'Nui', 'Fakaalofa', 'Tokelau Village', 'Tia', 'Pola', 'Hikutavake', 'Alofi', 'Tokelau Island'],
        'TON': ['Nukuʻalofa', 'Neiafu', 'Haveluloto', 'Vavaʻu', 'Pangai', 'Haʻapai', 'Fuaʻamotu', 'Muʻa', 'Tāufaʻāhau', 'Kolovai', 'Houma', 'Lifuka', 'Vaini', 'Niuatoputapu', 'Felemea', 'Foʻui', 'Kanokupolu', 'Tatakamotonga', 'Pea', 'Tofoa'],
        'TTO': ['Port of Spain', 'San Fernando', 'Arima', 'Chaguanas', 'Point Fortin', 'Tunapuna', 'Couva', 'Scarborough', 'Princes Town', 'Tacarigua', 'Mayaro', 'Blanchisseuse', 'Sangre Grande', 'Debe', 'Cumana', 'Rio Claro', 'Bon Accord', 'Moruga', 'Gasparillo', 'Palmiste'],
        'TUN': ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Gafsa', 'El Kef', 'Kasserine', 'Mahdia', 'Monastir', 'Nabeul', 'Sidi Bouzid', 'Siliana', 'Tozeur', 'Zaghouan', 'Ben Arous', 'Jendouba', 'Médenine'],
        'TUR': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Mersin', 'Diyarbakır', 'Samsun', 'Eskişehir', 'Denizli', 'Şanlıurfa', 'Malatya', 'Kahramanmaraş', 'Trabzon', 'Van', 'Batman'],
        'TKM': ['Ashgabat', 'Turkmenabat', 'Dashoguz', 'Mary', 'Balkanabat', 'Tejen', 'Bayramaly', 'Serdar', 'Bereket', 'Gazojak', 'Köwetli', 'Tagtabazar', 'Boldumsaz', 'Gazalkent', 'Gumdag', 'Atamurat', 'Sarahs', 'Kerki', 'Sakar', 'Etrek'],
        'TCA': ['Cockburn Town', 'Providenciales', 'Grand Turk', 'South Caicos', 'North Caicos', 'Middle Caicos', 'East Caicos', 'West Caicos', 'Salt Cay', 'Blue Hills', 'Bottle Creek', 'Five Cays', 'Whitby', 'The Bight', 'Cheshire Hall', 'Leeward', 'Kew', 'Pine Cay', 'Conch Bar', 'Raymond Hill'],
        'TUV': ['Funafuti', 'Fongafale', 'Vaitupu', 'Nanumea', 'Nanumaga', 'Nui', 'Niutao', 'Nukufetau', 'Nukulaelae', 'Motufoua', 'Teone', 'Lofeagai', 'Savave', 'Alapi', 'Fakaifou', 'Matangi', 'Lepuia', 'Funafala', 'Tepuka', 'Te Motu Foliki'],
        'UGA': ['Kampala', 'Entebbe', 'Jinja', 'Gulu', 'Mbarara', 'Lira', 'Mbale', 'Masaka', 'Fort Portal', 'Soroti', 'Kabale', 'Hoima', 'Arua', 'Iganga', 'Mukono', 'Bweyogerere', 'Kasese', 'Nakasongola', 'Sembabule', 'Kibaale'],
        'UKR': ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Vinnytsia', 'Chernihiv', 'Poltava', 'Cherkasy', 'Sumy', 'Zhytomyr', 'Kherson', 'Chernivtsi', 'Horlivka', 'Ivano-Frankivsk'],
        'ARE': ['Abu Dhabi', 'Dubai', 'Sharjah', 'Al Ain', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Khor Fakkan', 'Dibba Al-Fujairah', 'Kalba', 'Masafi', 'Mleiha', 'Jebel Ali', 'Hatta', 'Al Jazirah Al Hamra', 'Al Madam', 'Al Dhaid', 'Ghayathi', 'Liwa'],
        'GBR': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh', 'Cardiff', 'Belfast', 'Nottingham', 'Southampton', 'Brighton', 'Leicester', 'Coventry', 'Hull', 'Bradford', 'Stoke-on-Trent'],
        'UMI': ['Baker Island', 'Howland Island', 'Jarvis Island', 'Johnston Atoll', 'Kingman Reef', 'Midway Atoll', 'Palmyra Atoll', 'Wake Island'],
        'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'],
        'URY': ['Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Rivera', 'Tacuarembó', 'Mercedes', 'Artigas', 'Minas', 'San Carlos', 'Canelones', 'Durazno', 'Fray Bentos', 'Treinta y Tres', 'Florida', 'La Paloma', 'Colonia del Sacramento', 'Nueva Helvecia', 'Paso de los Toros', 'Rocha'],
        'UZB': ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana', 'Nukus', 'Qarshi', 'Jizzakh', 'Termiz', 'Margilan', 'Chirchiq', 'Bekabad', 'Kokand', 'Guliston', 'Navoi', 'Angren', 'Shahrisabz', 'Yangiyer', 'Olmaliq'],
        'VUT': ['Port Vila', 'Luganville', 'Norsup', 'Santo', 'Malekula', 'Tanna', 'Efate', 'Pentecost', 'Ambrym', 'Epi', 'Paama', 'Shepherd Islands', 'Torba', 'Sanma', 'Penama', 'Malampa', 'Eratap', 'Aore', 'Maewo', 'Ambae'],
        'VEN': ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay', 'Ciudad Guayana', 'Maturín', 'Puerto La Cruz', 'San Cristóbal', 'Barcelona', 'Cumaná', 'Ciudad Bolívar', 'Los Teques', 'Puerto Ordaz', 'San Felipe', 'Guanare', 'Mérida', 'Valera', 'Porlamar', 'La Guaira'],
        'VNM': ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Nha Trang', 'Hue', 'Bien Hoa', 'Buon Ma Thuot', 'Vung Tau', 'Long Xuyen', 'Thai Nguyen', 'Nam Dinh', 'Phan Thiet', 'Rach Gia', 'Quang Ngai', 'Cam Ranh', 'Pleiku', 'My Tho', 'Ha Long'],
        'VIR': ['Charlotte Amalie', 'Christiansted', 'Frederiksted', 'Red Hook', 'Estate Smith Bay', 'Estate Upper Love', 'Estate Lower Love', 'Estate Contant', 'Estate Anna\'s Retreat', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End', 'Estate East End'],
        'WLF': ['Mata-Utu', 'Alo', 'Sigave', 'Futuna', 'Wallis', 'Leava', 'Hihifo', 'Halalo', 'Luma', 'Fagali’i', 'Ahoa', 'Vaitupu', 'Finetomai', 'Pumasi', 'Vele', 'Toloke', 'Fale', 'Vaisei', 'Lavegahau', 'Mua'],
        'ESH': ['El Aaiún', 'Dakhla', 'Smara', 'Bojador', 'Bir Lehlu', 'Tifariti', 'Auserd', 'Guelta', 'Farsia', 'Laayoune', 'Agadir', 'Assa', 'Zouérat', 'Nouadhibou', 'Bir Gandus', 'Tantan', 'Tan-Tan', 'Es Semara', 'Bir Anzarane', 'Nouakchott'],
        'YEM': ['Sana\'a', 'Aden', 'Taiz', 'Al Hudaydah', 'Ibb', 'Dhamar', 'Al Mukalla', 'Sa\'dah', 'Hajjah', 'Al Bayda', 'Zabid', 'Amran', 'Lahij', 'Radaa', 'Shibam', 'Bayt al-Faqih', 'Ataq', 'Khamir', 'Mukayras', 'Mokha'],
        'ZMB': ['Lusaka', 'Ndola', 'Kitwe', 'Kabwe', 'Chingola', 'Mufulira', 'Luanshya', 'Kasama', 'Livingstone', 'Chipata', 'Mazabuka', 'Monze', 'Choma', 'Solwezi', 'Mongu', 'Mpika', 'Chililabombwe', 'Kalulushi', 'Kapiri Mposhi', 'Katete'],
        'ZWE': ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru', 'Kwekwe', 'Kadoma', 'Masvingo', 'Chinhoyi', 'Marondera', 'Hwange', 'Gwanda', 'Bindura', 'Victoria Falls', 'Mutoko', 'Chegutu', 'Zvishavane', 'Chipinge', 'Ruwa', 'Kariba'],
    };

    function showSignupForm() {
        loginFormContainer.classList.remove('active');
        signupFormContainer.classList.add('active');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    }

    function showLoginForm() {
        signupFormContainer.classList.remove('active');
        loginFormContainer.classList.add('active');
        signupTab.classList.remove('active');
        loginTab.classList.add('active');
    }

    // Tab navigation
    loginTab.addEventListener('click', showLoginForm);
    signupTab.addEventListener('click', showSignupForm);
    switchToSignup.addEventListener('click', function (e) {
        e.preventDefault();
        showSignupForm();
    });
    switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        showLoginForm();
    });

    // Handle country selection and populate cities
    countrySelect.addEventListener('change', function () {
        const selectedCountry = this.value;

        // Clear existing options
        citySelect.innerHTML = '<option value="">Select City</option>';

        if (selectedCountry) {
            // Enable city select
            citySelect.disabled = false;

            // Add cities for the selected country
            const cities = cityData[selectedCountry] || [];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            // Disable city select if no country is selected
            citySelect.disabled = true;
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.form-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const form = e.target.closest('form');
            if (form.checkValidity()) {
                // Create ripple effect
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                e.target.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

                console.log(form.id + ' submitted');
            } else {
                form.reportValidity();
            }
        });
    });

    // Password validation
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    confirmPassword?.addEventListener('input', function () {
        if (this.value !== newPassword.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });

    newPassword?.addEventListener('input', function () {
        if (confirmPassword.value && this.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
});
