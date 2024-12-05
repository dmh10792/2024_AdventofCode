import java.io.File;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Part2 {

    public static void main(String[] args) {
        int result = 0;
        boolean isEnabled = true; // Track if mul is enabled
        String regex = "mul\\(\\d{1,3},\\d{1,3}\\)|do\\(\\)|don't\\(\\)";

        final Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        try {
            // Reading the file
            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);

            while (myReader.hasNextLine()) {
                String line = myReader.nextLine();

                Matcher matcher = pattern.matcher(line);

                while (matcher.find()) {
                    String match = matcher.group();
                    if (match.startsWith("do(")) {
                        isEnabled = true;
                    } else if (match.startsWith("don't(")) {
                        isEnabled = false;
                    } else if (match.startsWith("mul(") && isEnabled) {
                        String[] parts = match.substring(4, match.length() - 1).split(",");
                        int x = Integer.parseInt(parts[0].trim());
                        int y = Integer.parseInt(parts[1].trim());
                        result += x * y;
                    }
                }
            }
            myReader.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println( result);
    }
}
