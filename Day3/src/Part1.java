import java.io.File;
import java.io.FileNotFoundException;
import java.util.Objects;
import java.util.Scanner;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Part1 {

    public static void main(String[] args) {

        int result = 0;

        // Compile regular expression
        final Pattern pattern = Pattern.compile("mul\\(\\d{1,3},\\d{1,3}\\)", Pattern.CASE_INSENSITIVE);

        try {

            //reading the file
            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);


            while (myReader.hasNextLine()) { //while there is a next line
                String line = myReader.nextLine();//store it in a string

                Matcher matcher = pattern.matcher(line);//put it in the matcher

                while (matcher.find()) {//while it can find a match

                    String match = matcher.group();//store the exact match

                    //get the numbers separated by the ","
                    String[] parts = match.substring(4, match.length() - 1).split(",");
                    int num1 = Integer.parseInt(parts[0].trim());
                    int num2 = Integer.parseInt(parts[1].trim());

                    result += num1 * num2;

                }
            }


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(result);

    }

}

//
//read in a string of characters
//look for the mul
//ensure that there is an opening (
//ensure that there are 2 numbers separated by a ,
//ensure there is a closing )
//do the operation
//add the result to the result
//return the result
