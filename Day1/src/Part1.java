import java.io.File;
import java.util.*;

import static java.lang.Math.abs;

public class Part1 {

    public static void main(String[] args) {

        List<Integer> leftList = new ArrayList<>();
        List<Integer> rightList = new ArrayList<>();

        int total = 0;//initialize numbers to return

        /*
         * Read in the lists
         */
        try {
            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);

            while (myReader.hasNextLine()) {

                String line = myReader.nextLine();//read in the next line

                String[] numbers = line.split("\\s+");//split into string array
                leftList.add(Integer.parseInt(numbers[0]));//add first one to left list and convert to int
                rightList.add(Integer.parseInt(numbers[1]));//add second one to right list and convert to int

            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        /*
         * Sort the lists
         */
        Collections.sort(leftList);
        Collections.sort(rightList);

        /*
            compare the lists for the difference between each value and add them to a total
         */
        for (int i = 0; i < leftList.size(); i++) {
            int num1 = leftList.get(i);
            int num2 = rightList.get(i);

            int diff = Math.abs(num1 - num2);

            total += diff;
        }

        //return/print the total
        System.out.println(total);
    }

}




//return/print the total

