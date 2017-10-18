import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class BlackJack extends HttpServlet{
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String command=(String) req.getParameter("command");
        PrintWriter printWriter=resp.getWriter();
        switch (command){
            case "test":
                printWriter.print("{\"resultCode\":true,\"cards\":[\"a1\",\"a2\"]}");
                printWriter.close();
                break;
            case "bet":
                String value=(String) req.getParameter("value");
                printWriter.print("{\"resultCode\":true,\"cards\":[\"a1\",\"a2\"],\"state\":\" \"}");
                printWriter.close();
                break;
            default:
                break;
        }
    }
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}