import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.logging.Logger;
import Object.*;

public class BlackJack extends HttpServlet{
    private Logger logger=Logger.getLogger("Game");
    private Game game = new Game();
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String command=(String) req.getParameter("command");
        String value;
        String state = "";
        PrintWriter printWriter=resp.getWriter();
        switch (command){
            case "test":
                printWriter.print("{\"resultCode\":true,\"cards\":[\"a1\",\"a2\"]}");
                printWriter.close();
                break;
            case "testbet":
                value = (String) req.getParameter("value");
                printWriter.print("{\"resultCode\":true,\"cards\":[\"a1\",\"a2\"],\"state\":\" \"}");
                printWriter.close();
                break;
            case "bet":
                value = (String) req.getParameter("value");
                int[] storeBet = new int[2];
                storeBet = game.bet(Integer.parseInt(value));
                printWriter.print("{\"resultCode\":true,\"bet_money\":" + Integer.toString(storeBet[0]) + ",\"money\":"+Integer.toString(storeBet[1])+"}");
                printWriter.close();
                break;
            case "deal":
                ArrayList<String> dealCards;
                dealCards = game.deal();
                Iterator<String> itDeal = dealCards.iterator();
                String cardsDeal ="[";
                while (itDeal.hasNext()) {
                    String s = itDeal.next();
                    cardsDeal = cardsDeal + "\"" + s + "\",";
                }
                cardsDeal = cardsDeal.substring(0,cardsDeal.length()-1);
                cardsDeal = cardsDeal + "]";
                printWriter.print("{\"resultCode\":true,\"state\":" + game.getState() + ",\"cards\":" + cardsDeal + "}");
                printWriter.close();
                break;
            case "hit":
                value = (String) req.getParameter("value");
                ArrayList<String> addCards;
                addCards = game.addCard(value);
                Iterator<String> itHit = addCards.iterator();
                String cardsHit ="[";
                while (itHit.hasNext()) {
                    String s = itHit.next();
                    cardsHit = cardsHit + "\"" + s + "\",";
                }
                cardsHit = cardsHit.substring(0,cardsHit.length()-1);
                cardsHit = cardsHit + "]";
                printWriter.print("{\"resultCode\":true,\"state\":" + game.getState() + ",\"cards\":" + cardsHit + "}");
                printWriter.close();
                break;
            case "double":
                String[] getDoubled;
                getDoubled = game.setDouble();
                printWriter.print("{\"resultCode\":true,\"cards\":[\"" + getDoubled[0] + "\"],\"bet_money\":" + getDoubled[1] +",\"money\":" + getDoubled[2] + "}");
                printWriter.close();
                break;
            case "insurance":
                String stateInsurance = game.buyInsurance();
                printWriter.print("{\"resultCode\":true,\"state\":" + game.getState() + "}");
                printWriter.close();
                break;
            case  "again":
                game.again();
                printWriter.print("{\"resultCode\":true}");
                printWriter.close();
            default:
                break;

        }
    }
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}