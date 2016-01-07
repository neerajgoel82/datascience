package com.adobe.SimpleApp;
import org.apache.spark.api.java.*;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.PosixParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.Function;

public class SimpleApp {


  public static void main(String[] args) {
	  Options options = new Options();
	  options.addOption("f", false, "Enter file path");
	  String logFile = args[0];//"/home/neeraj/Softwares/spark-1.6.0/README.md"; // Should be some file on your system
	  
	  
	  
	  CommandLineParser parser = null ;
	  CommandLine cmd = null ; 
	 
	  parser = new PosixParser();
	  try {
		cmd = parser.parse( options, args);
		if(cmd.hasOption("f")) 
		{
		  logFile = cmd.getOptionValue("f");
		}
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	  
	      
    SparkConf conf = new SparkConf().setAppName("Simple Application");
    JavaSparkContext sc = new JavaSparkContext(conf);
    JavaRDD<String> logData = sc.textFile(logFile).cache();

    long numAs = logData.filter(new Function<String, Boolean>() {
      public Boolean call(String s) { return s.contains("a"); }
    }).count();

    long numBs = logData.filter(new Function<String, Boolean>() {
      public Boolean call(String s) { return s.contains("b"); }
    }).count();

    System.out.println("Lines with a: " + numAs + ", lines with b: " + numBs);
  }
}