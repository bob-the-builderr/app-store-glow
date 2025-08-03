import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ArrowUp, ArrowDown, Minus, Lightbulb } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockKeywords = [
  {
    id: "1",
    keyword: "fitness tracker",
    lastUpdate: "2024-01-15",
    popularity: "45K",
    difficulty: 75,
    position: 12,
    competition: ["FitBit", "Apple Health", "Samsung Health"]
  },
  {
    id: "2", 
    keyword: "photo editor",
    lastUpdate: "2024-01-14",
    popularity: "89K",
    difficulty: 85,
    position: 8,
    competition: ["Photoshop", "VSCO", "Snapseed"]
  },
  {
    id: "3",
    keyword: "task manager",
    lastUpdate: "2024-01-13",
    popularity: "23K",
    difficulty: 45,
    position: 5,
    competition: ["Todoist", "Any.do", "Microsoft To Do"]
  },
  {
    id: "4",
    keyword: "music streaming",
    lastUpdate: "2024-01-12",
    popularity: "156K",
    difficulty: 90,
    position: 15,
    competition: ["Spotify", "Apple Music", "YouTube Music"]
  },
  {
    id: "5",
    keyword: "workout app",
    lastUpdate: "2024-01-11",
    popularity: "34K",
    difficulty: 60,
    position: 7,
    competition: ["Nike Training", "Adidas Training", "7 Minute Workout"]
  },
  {
    id: "6",
    keyword: "productivity app",
    lastUpdate: "2024-01-10",
    popularity: "67K",
    difficulty: 70,
    position: 20,
    competition: ["Notion", "Evernote", "OneNote", "Trello"]
  }
];

const getDifficultyColor = (difficulty: number) => {
  if (difficulty < 50) return "bg-green-100 text-green-800";
  if (difficulty < 80) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getDifficultyLabel = (difficulty: number) => {
  if (difficulty < 50) return "Low";
  if (difficulty < 80) return "Medium";
  return "High";
};

const getPositionChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUp className="w-4 h-4 text-green-600" />;
  if (change < 0) return <ArrowDown className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

export default function Keywords() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Track and optimize your keyword rankings</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="default" className="rounded-full">
            <Lightbulb className="w-4 h-4 mr-2" />
            Find Suggestions
          </Button>
          <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Keyword
          </Button>
        </div>
      </div>



      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search keywords..."
              className="pl-10 rounded-full"
          />
        </div>
        <Select>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="App Store Region" />
            </SelectTrigger>
                                               <SelectContent>
               <SelectItem value="af">Afghanistan</SelectItem>
               <SelectItem value="al">Albania</SelectItem>
               <SelectItem value="dz">Algeria</SelectItem>
               <SelectItem value="ad">Andorra</SelectItem>
               <SelectItem value="ao">Angola</SelectItem>
               <SelectItem value="ai">Anguilla</SelectItem>
               <SelectItem value="ag">Antigua and Barbuda</SelectItem>
               <SelectItem value="ar">Argentina</SelectItem>
               <SelectItem value="am">Armenia</SelectItem>
               <SelectItem value="au">Australia</SelectItem>
               <SelectItem value="at">Austria</SelectItem>
               <SelectItem value="az">Azerbaijan</SelectItem>
               <SelectItem value="bs">Bahamas</SelectItem>
               <SelectItem value="bh">Bahrain</SelectItem>
               <SelectItem value="bd">Bangladesh</SelectItem>
               <SelectItem value="bb">Barbados</SelectItem>
               <SelectItem value="by">Belarus</SelectItem>
               <SelectItem value="be">Belgium</SelectItem>
               <SelectItem value="bz">Belize</SelectItem>
               <SelectItem value="bj">Benin</SelectItem>
               <SelectItem value="bm">Bermuda</SelectItem>
               <SelectItem value="bt">Bhutan</SelectItem>
               <SelectItem value="bo">Bolivia</SelectItem>
               <SelectItem value="ba">Bosnia and Herzegovina</SelectItem>
               <SelectItem value="bw">Botswana</SelectItem>
               <SelectItem value="br">Brazil</SelectItem>
               <SelectItem value="bn">Brunei</SelectItem>
               <SelectItem value="bg">Bulgaria</SelectItem>
               <SelectItem value="bf">Burkina Faso</SelectItem>
               <SelectItem value="cv">Cabo Verde</SelectItem>
               <SelectItem value="kh">Cambodia</SelectItem>
               <SelectItem value="cm">Cameroon</SelectItem>
               <SelectItem value="ca">Canada</SelectItem>
               <SelectItem value="ky">Cayman Islands</SelectItem>
               <SelectItem value="cf">Central African Republic</SelectItem>
               <SelectItem value="td">Chad</SelectItem>
               <SelectItem value="cl">Chile</SelectItem>
               <SelectItem value="cn">China</SelectItem>
               <SelectItem value="co">Colombia</SelectItem>
               <SelectItem value="cd">Congo (Democratic Republic)</SelectItem>
               <SelectItem value="cg">Congo (Republic)</SelectItem>
               <SelectItem value="cr">Costa Rica</SelectItem>
               <SelectItem value="hr">Croatia</SelectItem>
               <SelectItem value="cy">Cyprus</SelectItem>
               <SelectItem value="cz">Czechia</SelectItem>
               <SelectItem value="ci">Côte d'Ivoire</SelectItem>
               <SelectItem value="dk">Denmark</SelectItem>
               <SelectItem value="dm">Dominica</SelectItem>
               <SelectItem value="do">Dominican Republic</SelectItem>
               <SelectItem value="ec">Ecuador</SelectItem>
               <SelectItem value="eg">Egypt</SelectItem>
               <SelectItem value="sv">El Salvador</SelectItem>
               <SelectItem value="ee">Estonia</SelectItem>
               <SelectItem value="sz">Eswatini</SelectItem>
               <SelectItem value="et">Ethiopia</SelectItem>
               <SelectItem value="fj">Fiji</SelectItem>
               <SelectItem value="fi">Finland</SelectItem>
               <SelectItem value="fr">France</SelectItem>
               <SelectItem value="ga">Gabon</SelectItem>
               <SelectItem value="gm">Gambia</SelectItem>
               <SelectItem value="ge">Georgia</SelectItem>
               <SelectItem value="de">Germany</SelectItem>
               <SelectItem value="gh">Ghana</SelectItem>
               <SelectItem value="gr">Greece</SelectItem>
               <SelectItem value="gd">Grenada</SelectItem>
               <SelectItem value="gt">Guatemala</SelectItem>
               <SelectItem value="gn">Guinea</SelectItem>
               <SelectItem value="gw">Guinea-Bissau</SelectItem>
               <SelectItem value="gy">Guyana</SelectItem>
               <SelectItem value="hn">Honduras</SelectItem>
               <SelectItem value="hk">Hong Kong</SelectItem>
               <SelectItem value="hu">Hungary</SelectItem>
               <SelectItem value="is">Iceland</SelectItem>
               <SelectItem value="in">India</SelectItem>
               <SelectItem value="id">Indonesia</SelectItem>
               <SelectItem value="iq">Iraq</SelectItem>
               <SelectItem value="ie">Ireland</SelectItem>
               <SelectItem value="il">Israel</SelectItem>
               <SelectItem value="it">Italy</SelectItem>
               <SelectItem value="jm">Jamaica</SelectItem>
               <SelectItem value="jp">Japan</SelectItem>
               <SelectItem value="jo">Jordan</SelectItem>
               <SelectItem value="kz">Kazakhstan</SelectItem>
               <SelectItem value="ke">Kenya</SelectItem>
               <SelectItem value="kr">Korea, Republic of (South Korea)</SelectItem>
               <SelectItem value="xk">Kosovo</SelectItem>
               <SelectItem value="kw">Kuwait</SelectItem>
               <SelectItem value="kg">Kyrgyzstan</SelectItem>
               <SelectItem value="la">Laos</SelectItem>
               <SelectItem value="lv">Latvia</SelectItem>
               <SelectItem value="lb">Lebanon</SelectItem>
               <SelectItem value="lr">Liberia</SelectItem>
               <SelectItem value="ly">Libya</SelectItem>
               <SelectItem value="li">Liechtenstein</SelectItem>
               <SelectItem value="lt">Lithuania</SelectItem>
               <SelectItem value="lu">Luxembourg</SelectItem>
               <SelectItem value="mo">Macao</SelectItem>
               <SelectItem value="mg">Madagascar</SelectItem>
               <SelectItem value="mw">Malawi</SelectItem>
               <SelectItem value="my">Malaysia</SelectItem>
               <SelectItem value="mv">Maldives</SelectItem>
               <SelectItem value="ml">Mali</SelectItem>
               <SelectItem value="mt">Malta</SelectItem>
               <SelectItem value="mr">Mauritania</SelectItem>
               <SelectItem value="mu">Mauritius</SelectItem>
               <SelectItem value="mx">Mexico</SelectItem>
               <SelectItem value="fm">Micronesia</SelectItem>
               <SelectItem value="md">Moldova</SelectItem>
               <SelectItem value="mc">Monaco</SelectItem>
               <SelectItem value="mn">Mongolia</SelectItem>
               <SelectItem value="me">Montenegro</SelectItem>
               <SelectItem value="ms">Montserrat</SelectItem>
               <SelectItem value="ma">Morocco</SelectItem>
               <SelectItem value="mz">Mozambique</SelectItem>
               <SelectItem value="mm">Myanmar</SelectItem>
               <SelectItem value="na">Namibia</SelectItem>
               <SelectItem value="nr">Nauru</SelectItem>
               <SelectItem value="np">Nepal</SelectItem>
               <SelectItem value="nl">Netherlands</SelectItem>
               <SelectItem value="nz">New Zealand</SelectItem>
               <SelectItem value="ni">Nicaragua</SelectItem>
               <SelectItem value="ne">Niger</SelectItem>
               <SelectItem value="ng">Nigeria</SelectItem>
               <SelectItem value="no">Norway</SelectItem>
               <SelectItem value="om">Oman</SelectItem>
               <SelectItem value="pk">Pakistan</SelectItem>
               <SelectItem value="pw">Palau</SelectItem>
               <SelectItem value="ps">Palestine, State of</SelectItem>
               <SelectItem value="pa">Panama</SelectItem>
               <SelectItem value="pg">Papua New Guinea</SelectItem>
               <SelectItem value="py">Paraguay</SelectItem>
               <SelectItem value="pe">Peru</SelectItem>
               <SelectItem value="ph">Philippines</SelectItem>
               <SelectItem value="pl">Poland</SelectItem>
               <SelectItem value="pt">Portugal</SelectItem>
               <SelectItem value="qa">Qatar</SelectItem>
               <SelectItem value="mk">North Macedonia</SelectItem>
               <SelectItem value="ro">Romania</SelectItem>
               <SelectItem value="ru">Russia</SelectItem>
               <SelectItem value="rw">Rwanda</SelectItem>
               <SelectItem value="kn">Saint Kitts and Nevis</SelectItem>
               <SelectItem value="lc">Saint Lucia</SelectItem>
               <SelectItem value="vc">Saint Vincent and the Grenadines</SelectItem>
               <SelectItem value="ws">Samoa</SelectItem>
               <SelectItem value="st">São Tomé and Príncipe</SelectItem>
               <SelectItem value="sa">Saudi Arabia</SelectItem>
               <SelectItem value="sn">Senegal</SelectItem>
               <SelectItem value="rs">Serbia</SelectItem>
               <SelectItem value="sc">Seychelles</SelectItem>
               <SelectItem value="sl">Sierra Leone</SelectItem>
               <SelectItem value="sg">Singapore</SelectItem>
               <SelectItem value="sk">Slovakia</SelectItem>
               <SelectItem value="si">Slovenia</SelectItem>
               <SelectItem value="sb">Solomon Islands</SelectItem>
               <SelectItem value="za">South Africa</SelectItem>
               <SelectItem value="es">Spain</SelectItem>
               <SelectItem value="lk">Sri Lanka</SelectItem>
               <SelectItem value="sr">Suriname</SelectItem>
               <SelectItem value="se">Sweden</SelectItem>
               <SelectItem value="ch">Switzerland</SelectItem>
               <SelectItem value="tw">Taiwan</SelectItem>
               <SelectItem value="tj">Tajikistan</SelectItem>
               <SelectItem value="tz">Tanzania</SelectItem>
               <SelectItem value="th">Thailand</SelectItem>
               <SelectItem value="to">Tonga</SelectItem>
               <SelectItem value="tt">Trinidad and Tobago</SelectItem>
               <SelectItem value="tn">Tunisia</SelectItem>
               <SelectItem value="tr">Turkey</SelectItem>
               <SelectItem value="tm">Turkmenistan</SelectItem>
               <SelectItem value="tc">Turks and Caicos Islands</SelectItem>
               <SelectItem value="ug">Uganda</SelectItem>
               <SelectItem value="ua">Ukraine</SelectItem>
               <SelectItem value="ae">United Arab Emirates</SelectItem>
               <SelectItem value="gb">United Kingdom</SelectItem>
               <SelectItem value="us">United States</SelectItem>
               <SelectItem value="uy">Uruguay</SelectItem>
               <SelectItem value="uz">Uzbekistan</SelectItem>
               <SelectItem value="vu">Vanuatu</SelectItem>
               <SelectItem value="ve">Venezuela</SelectItem>
               <SelectItem value="vn">Vietnam</SelectItem>
               <SelectItem value="vg">Virgin Islands (British)</SelectItem>
               <SelectItem value="ye">Yemen</SelectItem>
               <SelectItem value="zm">Zambia</SelectItem>
               <SelectItem value="zw">Zimbabwe</SelectItem>
             </SelectContent>
         </Select>
                   <Select>
            <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="low">Low (0-49)</SelectItem>
            <SelectItem value="medium">Medium (50-79)</SelectItem>
            <SelectItem value="high">High (80-100)</SelectItem>
          </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="w-[150px] rounded-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
             <SelectItem value="rank">Position</SelectItem>
             <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
             <SelectItem value="lastUpdate">Last Update</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Keyword</TableHead>
              <TableHead className="font-semibold">Last Update</TableHead>
              <TableHead className="font-semibold">Popularity</TableHead>
              <TableHead className="font-semibold">Difficulty</TableHead>
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Competition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {mockKeywords.map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell className="font-medium">{keyword.keyword}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(keyword.lastUpdate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{keyword.popularity}</TableCell>
                <TableCell>
                  <Badge className={getDifficultyColor(keyword.difficulty)}>
                    {getDifficultyLabel(keyword.difficulty)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{keyword.position}</span>
                    {getPositionChangeIcon(0)} {/* Placeholder for rank change */}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {keyword.competition.slice(0, 2).map((app, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                    {keyword.competition.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{keyword.competition.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}